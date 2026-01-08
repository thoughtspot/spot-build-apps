import React, { useState, useEffect, useRef } from 'react';
import styles from './Layout.module.scss';
import Header from '../Header/Header';
import LiveBoard from '../Liveboard/Liveboard';
import { AuthType, init } from '@thoughtspot/visual-embed-sdk';
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
  // Initialize ThoughtSpot SDK only once when component mounts
  // Use a ref to track if init has been called to prevent multiple initializations
  const initCalledRef = useRef(false);
  useEffect(() => {
    if (!initCalledRef.current && config.host) {
      init({
        thoughtSpotHost: config.host,
        authType: AuthType.TrustedAuthTokenCookieless,
        getAuthToken: () => {
          return fetch(document.location.origin + '/api/apps/accessToken', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((res) => res.json());
        },
      });
      initCalledRef.current = true;
    }
  }, [config.host]);

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
