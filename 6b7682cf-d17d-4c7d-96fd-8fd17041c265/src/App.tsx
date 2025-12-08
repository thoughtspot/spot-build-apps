import React, { useEffect } from 'react';
import styles from './App.module.scss';
import Layout from './components/Layout/Layout';
import TSLogo from '../assets/TSLogoWhite.svg';
import appConfig from './config/appConfig';
import { track, getCommonProperties } from './utils/tracking';

const App: React.FC = () => {
  let formattedDate;
  if (appConfig?.expires_at) {
    formattedDate = new Date(appConfig.expires_at)
      .toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
      .toUpperCase();
  }

  useEffect(() => {
    // Event 6: spotbuild-sample-app-opened
    track('spotbuild-published-app-opened', {
      ...getCommonProperties(appConfig.appId),
      sampleAppExpiry: appConfig.expires_at,
    });
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.mainContainer}>
        <Layout config={appConfig} />
      </div>
      <div className={styles.TsInfo}>
        <div className={styles.TSLogo}>
          <img src={TSLogo} alt="ThoughtSpot Logo" />
        </div>
        <div className={styles.appInfo}>
          <div>
            DEMO APP POWERED BY{' '}
            <a href="https://www.thoughtspot.com" target="_blank" className={styles.underline}>
              THOUGHTSPOT
            </a>
          </div>
          <div>AVAILABLE UNTIL {formattedDate ?? ''} | 72 VIEWS</div>
        </div>
        <div className={styles.quickLinks}>
          <a href="https://www.thoughtspot.com" target="_blank">
            thoughtspot.com
          </a>
          <span></span>
          <a
            href="https://www.thoughtspot.com/contact-us"
            target="_blank"
            onClick={() => {
              // Event 12: Spotbuild-contact-sales-clicked
              track('Spotbuild-contact-sales-clicked', {
                ...getCommonProperties(appConfig.appId),
                appState: 'Published',
                page: 'Published App',
              });
            }}
          >
            Contact sales
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
