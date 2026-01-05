/**
 * Simple tracking utility for the app-template package
 * This sends tracking events to the backend API
 */

// Get the API base URL from environment or default to localhost
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * Generate a GUID (UUID v4)
 */
const generateGUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * Get or create a session GUID
 * This GUID persists for the browser session
 */
export const getSessionGUID = (): string => {
  const SESSION_GUID_KEY = 'spotbuild_session_guid';

  // Try to get existing GUID from sessionStorage
  let sessionGuid = sessionStorage.getItem(SESSION_GUID_KEY);

  // If no GUID exists, create a new one
  if (!sessionGuid) {
    sessionGuid = generateGUID();
    sessionStorage.setItem(SESSION_GUID_KEY, sessionGuid);
  }

  return sessionGuid;
};

export const track = (eventName: string, properties: Record<string, unknown>): void => {
  try {
    // Fire and forget - don't wait for response
    fetch(`${API_BASE_URL}/apps/track-event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventName,
        properties,
      }),
    }).catch((error) => {
      // Silently fail - tracking should never break the app
      console.debug('Tracking error:', error);
    });
  } catch (error) {
    // Silently fail - tracking should never break the app
    console.debug('Tracking error:', error);
  }
};

/**
 * Get common properties for all events
 * Only userId and currentUrl are common across all events
 */
export const getCommonProperties = (appId?: string): Record<string, unknown> => {
  return {
    userId: getSessionGUID(),
    currentUrl: window.location.href,
    appId: appId || '',
  };
};
