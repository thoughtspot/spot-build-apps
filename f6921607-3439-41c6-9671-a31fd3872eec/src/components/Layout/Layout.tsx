import React, { useState, useEffect } from 'react';
import styles from './Layout.module.scss';
import Header from '../Header/Header';
import LiveBoard from '../Liveboard/Liveboard';
import Spotter from '../Spotter/Spotter';

interface LayoutProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any;
  isSDKReady?: boolean;
}

const TABS = ['liveboard', 'spotter'];

const Layout: React.FC<LayoutProps> = ({ config, isSDKReady = false }) => {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [colorSchema, setColorSchema] = useState(config?.app_config?.color_schema || {});

  useEffect(() => {
    setColorSchema(config?.app_config?.color_schema || {});
  }, [JSON.stringify(config)]);

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
    // Don't render embeds until SDK is initialized
    if (!isSDKReady) {
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
