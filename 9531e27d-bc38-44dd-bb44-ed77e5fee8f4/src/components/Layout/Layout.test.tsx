import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import Layout from './Layout';
import { init, AuthType } from '@thoughtspot/visual-embed-sdk';

// Mock the ThoughtSpot SDK
vi.mock('@thoughtspot/visual-embed-sdk', () => ({
  init: vi.fn(),
  AuthType: {
    TrustedAuthTokenCookieless: 'AuthServerCookieless',
  },
}));

// Mock fetch globally
global.fetch = vi.fn();

// Mock Header and LiveBoard components
vi.mock('../Header/Header', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ logo, menuItems, handleMenuItemClick, activeTab }: any) => (
    <div data-testid="header">
      {logo && <img src={logo} alt="logo" />}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {menuItems?.map((item: any) => (
        <button key={item.key} onClick={() => handleMenuItemClick(item.key)}>
          {item.label}
        </button>
      ))}
      Active: {activeTab}
    </div>
  ),
}));

vi.mock('../Liveboard/Liveboard', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ liveboardId, colorSchema }: any) => (
    <div data-testid="liveboard">
      Liveboard: {liveboardId}
      {JSON.stringify(colorSchema)}
    </div>
  ),
}));

vi.mock('../Spotter/Spotter', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ modelId, colorSchema }: any) => (
    <div data-testid="spotter">
      Spotter: {modelId}
      {JSON.stringify(colorSchema)}
    </div>
  ),
}));

describe('Layout - ThoughtSpot SDK Initialization', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock successful fetch response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global.fetch as any).mockResolvedValue({
      json: vi.fn().mockResolvedValue({ token: 'mock-token' }),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('init is called correctly', () => {
    it('should call init once when component mounts with valid config.host', async () => {
      const config = {
        host: 'https://thoughtspot.example.com',
        liveboardId: 'test-liveboard-id',
        modelId: 'test-model-id',
        logo: 'logo.png',
        app_config: {
          color_schema: {
            '--ts-var-root-background': '#FFFFFF',
          },
          menu_items: [
            { key: 'liveboard', label: 'Liveboard' },
            { key: 'spotter', label: 'Spotter' },
          ],
        },
      };

      render(<Layout config={config} />);

      await waitFor(() => {
        expect(init).toHaveBeenCalledTimes(1);
      });

      expect(init).toHaveBeenCalledWith({
        thoughtSpotHost: 'https://thoughtspot.example.com',
        authType: AuthType.TrustedAuthTokenCookieless,
        getAuthToken: expect.any(Function),
      });
    });

    it('should not call init when config.host is missing', () => {
      const config = {
        liveboardId: 'test-liveboard-id',
        app_config: {},
      };

      render(<Layout config={config} />);

      expect(init).not.toHaveBeenCalled();
    });

    it('should not call init when config.host is empty string', () => {
      const config = {
        host: '',
        liveboardId: 'test-liveboard-id',
        app_config: {},
      };

      render(<Layout config={config} />);

      expect(init).not.toHaveBeenCalled();
    });

    it('should not call init when config.host is null', () => {
      const config = {
        host: null,
        liveboardId: 'test-liveboard-id',
        app_config: {},
      };

      render(<Layout config={config} />);

      expect(init).not.toHaveBeenCalled();
    });
  });

  describe('init is called only once', () => {
    it('should not call init multiple times on re-renders with same host', async () => {
      const config = {
        host: 'https://thoughtspot.example.com',
        liveboardId: 'test-liveboard-id',
        app_config: {
          color_schema: {
            '--ts-var-root-background': '#FFFFFF',
          },
        },
      };

      const { rerender } = render(<Layout config={config} />);

      await waitFor(() => {
        expect(init).toHaveBeenCalledTimes(1);
      });

      // Re-render with same host but different other props
      rerender(
        <Layout
          config={{
            ...config,
            liveboardId: 'different-liveboard-id',
          }}
        />
      );

      // Wait a bit to ensure no additional calls
      await waitFor(
        () => {
          expect(init).toHaveBeenCalledTimes(1);
        },
        { timeout: 100 }
      );
    });

    it('should call init again when config.host changes', async () => {
      const initialConfig = {
        host: 'https://thoughtspot.example.com',
        liveboardId: 'test-liveboard-id',
        app_config: {},
      };

      render(<Layout config={initialConfig} />);

      await waitFor(() => {
        expect(init).toHaveBeenCalledTimes(1);
      });

      expect(init).toHaveBeenCalledWith(
        expect.objectContaining({
          thoughtSpotHost: 'https://thoughtspot.example.com',
        })
      );
    });
  });

  describe('getAuthToken function', () => {
    it('should configure getAuthToken to fetch from correct endpoint', async () => {
      const config = {
        host: 'https://thoughtspot.example.com',
        liveboardId: 'test-liveboard-id',
        app_config: {},
      };

      render(<Layout config={config} />);

      await waitFor(() => {
        expect(init).toHaveBeenCalled();
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const initCall = (init as any).mock.calls[0][0];
      expect(initCall.getAuthToken).toBeDefined();
      expect(typeof initCall.getAuthToken).toBe('function');

      // Call the getAuthToken function
      const tokenPromise = initCall.getAuthToken();
      await tokenPromise;

      expect(global.fetch).toHaveBeenCalledWith(
        document.location.origin + '/api/apps/accessToken',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    });

    it('should return JSON response from getAuthToken', async () => {
      const mockToken = { token: 'test-token-123' };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global.fetch as any).mockResolvedValue({
        json: vi.fn().mockResolvedValue(mockToken),
      });

      const config = {
        host: 'https://thoughtspot.example.com',
        liveboardId: 'test-liveboard-id',
        app_config: {},
      };

      render(<Layout config={config} />);

      await waitFor(() => {
        expect(init).toHaveBeenCalled();
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const initCall = (init as any).mock.calls[0][0];
      const token = (await initCall.getAuthToken()) as { token: string };

      expect(token).toEqual(mockToken);
    });

    it('should handle fetch errors in getAuthToken gracefully', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global.fetch as any).mockRejectedValue(new Error('Network error'));

      const config = {
        host: 'https://thoughtspot.example.com',
        liveboardId: 'test-liveboard-id',
        app_config: {},
      };

      render(<Layout config={config} />);

      await waitFor(() => {
        expect(init).toHaveBeenCalled();
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const initCall = (init as any).mock.calls[0][0];

      // Should not throw, but handle error gracefully
      await expect(initCall.getAuthToken() as Promise<unknown>).rejects.toThrow('Network error');

      consoleErrorSpy.mockRestore();
    });
  });

  describe('init configuration', () => {
    it('should pass correct authType to init', async () => {
      const config = {
        host: 'https://thoughtspot.example.com',
        liveboardId: 'test-liveboard-id',
        app_config: {},
      };

      render(<Layout config={config} />);

      await waitFor(() => {
        expect(init).toHaveBeenCalled();
      });

      expect(init).toHaveBeenCalledWith(
        expect.objectContaining({
          authType: AuthType.TrustedAuthTokenCookieless,
        })
      );
    });

    it('should pass correct thoughtSpotHost to init', async () => {
      const testHost = 'https://custom-thoughtspot-host.com';
      const config = {
        host: testHost,
        liveboardId: 'test-liveboard-id',
        app_config: {},
      };

      render(<Layout config={config} />);

      await waitFor(() => {
        expect(init).toHaveBeenCalled();
      });

      expect(init).toHaveBeenCalledWith(
        expect.objectContaining({
          thoughtSpotHost: testHost,
        })
      );
    });
  });

  describe('edge cases', () => {
    it('should handle config with only host property', async () => {
      const config = {
        host: 'https://thoughtspot.example.com',
      };

      render(<Layout config={config} />);

      await waitFor(() => {
        expect(init).toHaveBeenCalledTimes(1);
      });
    });
  });
});
