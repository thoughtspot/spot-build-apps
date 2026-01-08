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
  useEffect(() => {
    setColorSchema(config?.app_config?.color_schema || {});
  }, [JSON.stringify(config)]);

  const initCalledRef = useRef(false);

  useEffect(() => {
    console.log('[Layout] ThoughtSpot SDK initialization check:', {
      hasConfig: !!config,
      hasHost: !!config?.host,
      host: config?.host,
      isInitCalled: initCalledRef.current,
      appId: config?.appId,
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
          });
          authEventEmitter.on(AuthStatus.FAILURE, (reason: unknown) => {
            console.error('[Layout] ThoughtSpot SDK authentication failed:', reason);
          });
          authEventEmitter.on(AuthStatus.SDK_SUCCESS, () => {
            console.log('[Layout] ThoughtSpot SDK authentication SDK_SUCCESS');
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
    return (
      <>
        <div className={`${styles.tabPanel} ${activeTab === 'liveboard' ? styles.active : ''}`}>
          <LiveBoard liveboardId={config.liveboardId} colorSchema={colorSchema} />
        </div>
        <div className={`${styles.tabPanel} ${activeTab === 'spotter' ? styles.active : ''}`}>
          <Spotter modelId={config.modelId} colorSchema={colorSchema} />
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
