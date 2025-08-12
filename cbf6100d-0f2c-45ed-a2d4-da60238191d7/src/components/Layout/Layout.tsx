import React, { useState } from 'react';
import styles from './Layout.module.scss';
import Header from '../Header/Header';
import LiveBoard from '../Liveboard/Liveboard';
import { AuthType, init } from '@thoughtspot/visual-embed-sdk';
import Spotter from '../Spotter/Spotter';

interface LayoutProps {
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
          variables: appConfig.color_schema,
        },
      },
    },
    getAuthToken: () => {
      return fetch(window.location.origin + '/api/apps/accessToken', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json());
    },
  });
  document.documentElement.style.setProperty(
    '--var-root-background',
    appConfig.color_schema['--ts-var-root-background'] || '#F4F4F4'
  );
  document.documentElement.style.setProperty(
    '--var-root-color',
    appConfig.color_schema['--ts-var-root-color'] || '#1D232F'
  );
  document.documentElement.style.setProperty(
    '--var-root-secondary-color',
    appConfig.color_schema['--ts-var-root-secondary-color'] || '#2770EF'
  );

  const getTabContent = () => {
    if (activeTab === 'dashboard') {
      return <LiveBoard liveboardId={appConfig.liveboardId} />;
    }
    return <Spotter modelId={appConfig.modelId} />;
  };
  return (
    <div className={styles.layout}>
      <Header />
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
      {getTabContent()}
    </div>
  );
};

export default Layout;
