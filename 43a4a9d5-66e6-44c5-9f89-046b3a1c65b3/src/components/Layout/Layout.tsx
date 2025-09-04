import React, { useState } from 'react';
import styles from './Layout.module.scss';
import Header from '../Header/Header';
import LiveBoard from '../Liveboard/Liveboard';
import { AuthType, init } from '@thoughtspot/visual-embed-sdk';
import Spotter from '../Spotter/Spotter';

interface LayoutProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  appConfig: any;
}

const TABS = [
  {
    label: 'Dashboard',
    value: 'dashboard',
  },
  {
    label: 'AI Analyst assistant',
    value: 'ai-analyst-assistant',
  },
];

const Layout: React.FC<LayoutProps> = ({ appConfig }) => {
  const [activeTab, setActiveTab] = useState(TABS[0].value);
  init({
    thoughtSpotHost: appConfig.host,
    authType: AuthType.TrustedAuthTokenCookieless,
    customizations: {
      style: {
        customCSS: {
          variables: appConfig.app_config.color_schema,
        },
      },
    },
    getAuthToken: () => {
      return fetch('http://172.32.43.117:3001/api/apps/accessToken', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
      //   return fetch('https://team3.thoughtspot.cloud/api/rest/2.0/auth/token/full', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       secret_key: 'd3510169-9750-4d0a-ae0e-6c40d2b43e47',
      //       username: 'saikumar.anapuram+0202@thoughtspot.com',
      //     }),
      //   })
      //     .then((res) => res.json())
      //     .then((data) => data.token);
    },
  });

  document.documentElement.style.setProperty(
    '--var-root-background',
    appConfig.app_config.color_schema['--ts-var-root-background'] || '#F6F8FA'
  );
  document.documentElement.style.setProperty(
    '--var-viz-background',
    appConfig.app_config.color_schema['--ts-var-viz-background'] || '#FFFFFF'
  );
  document.documentElement.style.setProperty(
    '--var-root-color',
    appConfig.app_config.color_schema['--ts-var-root-color'] || '#000000'
  );
  document.documentElement.style.setProperty(
    '--var-button--secondary-background',
    appConfig.app_config.color_schema['--ts-var-button--secondary-background'] || '#2770EF'
  );

  const getTabContent = () => {
    if (activeTab === 'dashboard') {
      return <LiveBoard liveboardId={appConfig.liveboardId} />;
    }
    return <Spotter modelId={appConfig.modelId} />;
  };
  const extractItems = appConfig?.app_config.menuItems?.map((menuItem:never, index: number) => {
    return {
      href: '#'+menuItem,
      label: menuItem,
      isActive: index == 1,
    };
  });
  return (
    <div className={styles.layout}>
      <Header logo={appConfig.logo} menuItems={extractItems} />
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          {TABS.map((tab) => (
            <div
              key={tab.value}
              className={`${styles.tab} ${tab.value === activeTab ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.tabContent}>{getTabContent()}</div>
    </div>
  );
};

export default Layout;
