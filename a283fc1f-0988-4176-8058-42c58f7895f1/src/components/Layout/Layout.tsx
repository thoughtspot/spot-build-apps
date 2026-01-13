import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (config?.host) {
      try {
        const authEventEmitter = init({
          thoughtSpotHost: config.host,
          authType: AuthType.TrustedAuthTokenCookieless,
          getAuthToken: () => {
            const tokenUrl = document.location.origin + '/api/apps/accessToken';
            return fetch(tokenUrl, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }).then((res) => {
              return res.json();
            });
          },
        });

        // Set up listeners outside try-catch
        if (authEventEmitter) {
          authEventEmitter.on(AuthStatus.SUCCESS, () => {
            setIsSDKInitialized(true);
          });
          authEventEmitter.on(AuthStatus.SDK_SUCCESS, () => {
            setIsSDKInitialized(true);
          });
        }
      } catch (error) {
        console.error('[Layout] Error initializing ThoughtSpot SDK:', error);
      }
    }
  }, [config?.host, isSDKInitialized]);

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
    // Don't render embeds until SDK is initialized (if host is present)
    // This prevents the "render was called before calling init" error
    if (config?.host && !isSDKInitialized) {
      return null;
    }

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
