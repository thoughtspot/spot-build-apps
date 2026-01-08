import React, { useState, useEffect, useRef } from 'react';
import styles from './Layout.module.scss';
import Header from '../Header/Header';
import LiveBoard from '../Liveboard/Liveboard';
import { AuthType, init, AuthStatus } from '@thoughtspot/visual-embed-sdk';
import Spotter from '../Spotter/Spotter';

interface LayoutProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any;
}

const TABS = ['liveboard', 'spotter'];

const Layout: React.FC<LayoutProps> = ({ config }) => {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [colorSchema, setColorSchema] = useState(config?.app_config?.color_schema || {});
  const [isSDKInitialized, setIsSDKInitialized] = useState(false);

  useEffect(() => {
    setColorSchema(config?.app_config?.color_schema || {});
  }, [JSON.stringify(config)]);

  const initCalledRef = useRef(false);

  useEffect(() => {
    console.log('[Layout] Component mounted/updated with config:', {
      hasConfig: !!config,
      hasHost: !!config?.host,
      host: config?.host,
      liveboardId: config?.liveboardId,
      modelId: config?.modelId,
      appId: config?.appId,
      isInitCalled: initCalledRef.current,
      fullConfig: config,
    });

    if (config?.host) {
      if (initCalledRef.current) {
        console.warn('[Layout] ThoughtSpot SDK already initialized, skipping init call');
        return;
      }

      console.log('[Layout] Initializing ThoughtSpot SDK with config:', {
        thoughtSpotHost: config.host,
        authType: 'TrustedAuthTokenCookieless',
        appId: config?.appId,
      });

      try {
        const authEventEmitter = init({
          thoughtSpotHost: config.host,
          authType: AuthType.TrustedAuthTokenCookieless,
          getAuthToken: () => {
            console.log(
              '[Layout] Fetching auth token from:',
              'http://172.32.90.160:3001/api/apps/accessToken'
            );
            return fetch(document.location.origin + '/api/apps/accessToken', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then((res) => {
                console.log('[Layout] Auth token response status:', res.status);
                return res.json();
              })
              .then((tokenData) => {
                console.log('[Layout] Auth token received:', { hasToken: !!tokenData });
                return tokenData;
              })
              .catch((error) => {
                console.error('[Layout] Error fetching auth token:', error);
                throw error;
              });
          },
        });

        initCalledRef.current = true;

        console.log('[Layout] ThoughtSpot SDK init() called successfully', {
          authEventEmitter: !!authEventEmitter,
        });

        // Listen to auth events for debugging
        if (authEventEmitter) {
          authEventEmitter.on(AuthStatus.SUCCESS, () => {
            console.log('[Layout] ThoughtSpot SDK authentication successful');
            setIsSDKInitialized(true);
          });
          authEventEmitter.on(AuthStatus.FAILURE, (reason: unknown) => {
            console.error('[Layout] ThoughtSpot SDK authentication failed:', reason);
          });
          authEventEmitter.on(AuthStatus.SDK_SUCCESS, () => {
            console.log('[Layout] ThoughtSpot SDK authentication SDK_SUCCESS');
            // SDK_SUCCESS means init is complete, safe to render embeds
            setIsSDKInitialized(true);
          });
        }
      } catch (error) {
        console.error('[Layout] Error initializing ThoughtSpot SDK:', error);
      }
    } else {
      console.warn('[Layout] Cannot initialize ThoughtSpot SDK: config.host is missing', {
        config: config,
        hasConfig: !!config,
      });
      // If no host, we can't initialize, but we should still allow rendering if IDs exist
      // (though embeds won't work without init)
      if (!config?.host && (config?.liveboardId || config?.modelId)) {
        console.warn(
          '[Layout] Warning: Has liveboardId/modelId but no host - embeds will not work'
        );
      }
    }
  }, [config?.host]);

  document.documentElement.style.setProperty(
    '--var-root-background',
    config?.app_config?.color_schema?.['--ts-var-root-background'] || '#F6F8FA'
  );
  document.documentElement.style.setProperty(
    '--var-viz-background',
    config?.app_config?.color_schema?.['--ts-var-nav-background'] || '#FFFFFF'
  );
  document.documentElement.style.setProperty(
    '--var-root-color',
    config?.app_config?.color_schema?.['--ts-var-nav-color'] || '#000000'
  );
  document.documentElement.style.setProperty(
    '--var-button--secondary-background',
    config?.app_config?.color_schema?.['--ts-var-nav-hover-color'] || '#2770EF'
  );

  const getTabContent = () => {
    console.log('[Layout] Rendering tab content:', {
      activeTab,
      liveboardId: config?.liveboardId,
      modelId: config?.modelId,
      hasLiveboardId: !!config?.liveboardId,
      hasModelId: !!config?.modelId,
      isSDKInitialized,
    });

    // Don't render embeds until SDK is initialized (if host is present)
    // If no host, we can't initialize, so skip the check
    if (config?.host && !isSDKInitialized) {
      console.log('[Layout] Waiting for SDK initialization before rendering embeds');
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>Initializing ThoughtSpot SDK...</p>
        </div>
      );
    }

    return (
      <>
        <div className={`${styles.tabPanel} ${activeTab === 'liveboard' ? styles.active : ''}`}>
          {config?.liveboardId ? (
            <LiveBoard liveboardId={config.liveboardId} colorSchema={colorSchema} />
          ) : (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <p>No Liveboard ID provided</p>
              <pre>{JSON.stringify({ liveboardId: config?.liveboardId, config }, null, 2)}</pre>
            </div>
          )}
        </div>
        <div className={`${styles.tabPanel} ${activeTab === 'spotter' ? styles.active : ''}`}>
          {config?.modelId ? (
            <Spotter modelId={config.modelId} colorSchema={colorSchema} />
          ) : (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <p>No Model ID provided</p>
              <pre>{JSON.stringify({ modelId: config?.modelId, config }, null, 2)}</pre>
            </div>
          )}
        </div>
      </>
    );
  };
  const extractItems = config?.app_config?.menu_items?.map(
    (menuItem: { key: string; label: string }, index: number) => {
      return {
        href: '#' + menuItem.key,
        label: menuItem.label,
        isActive: index == 1,
        key: menuItem.key,
      };
    }
  );
  const handleMenuItemClick = (key: string) => {
    if (key === 'liveboard' || key === 'spotter') {
      setActiveTab(key);
    }
  };
  return (
    <div className={styles.layout}>
      <Header
        logo={config.logo}
        menuItems={extractItems}
        handleMenuItemClick={handleMenuItemClick}
        activeTab={activeTab}
      />
      <div className={styles.tabContent}>{getTabContent()}</div>
    </div>
  );
};

export default Layout;
