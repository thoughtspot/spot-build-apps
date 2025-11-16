import React from 'react';
import styles from './App.module.scss';
import Layout from './components/Layout/Layout';
import TSLogo from '../assets/TSLogo.svg';
import appConfig from './config/appConfig';

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
          <a href="https://www.thoughtspot.com/contact-us" target="_blank">
            Contact sales
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
