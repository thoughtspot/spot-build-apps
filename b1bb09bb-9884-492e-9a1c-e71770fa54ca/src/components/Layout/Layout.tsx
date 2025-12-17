import React, { useState, useEffect } from 'react';
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
  init({
    thoughtSpotHost: config.host,
    authType: AuthType.TrustedAuthTokenCookieless,
    getAuthToken: () => {
      return fetch(document.location.origin + '/api/apps/accessToken', {
        // return fetch('http://172.32.88.244:3001/api/apps/accessToken', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
      // return fetch('https://team3.thoughtspot.cloud/api/rest/2.0/auth/token/full', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     secret_key: 'd3510169-9750-4d0a-ae0e-6c40d2b43e47',
      //     username: 'saikumar.anapuram+0202@thoughtspot.com',
      //   }),
      // })
      //   .then((res) => res.json())
      //   .then((data) => data.token);
    },
  });

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
    if (activeTab === 'liveboard') {
      return <LiveBoard liveboardId={config.liveboardId} colorSchema={colorSchema} />;
    } else if (activeTab === 'spotter') {
      return <Spotter modelId={config.modelId} colorSchema={colorSchema} />;
    }
    return null;
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
