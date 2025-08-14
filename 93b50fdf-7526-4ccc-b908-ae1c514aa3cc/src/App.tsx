import React from 'react';
import styles from './App.module.scss';
import Layout from './components/Layout/Layout';
import TSLogo from './assets/images/TSLogo.svg';
import appConfig from './config/appConfig';

const App: React.FC = () => {
  // const appConfig = {
  //   host: "https://team3.thoughtspot.cloud",
  //   color_schema: {
  //     '--ts-var-root-background':'#253c4e',
  //     '--ts-var-viz-background':'#195145',
  //     '--ts-var-root-color':'#ffffff',
  //     '--ts-var-button--secondary-background':'#1368e8'
  //   },
  //   liveboardId: '22e79c21-eec4-40bf-997b-7454c6e3a2a5',
  //   modelId: 'cd252e5c-b552-49a8-821d-3eadaa049cca',
  //   expires_at: Date.now() +  (1000 * 60 * 60 * 9 * 19) // 30 days from now,
  // };
  const formattedDate = new Date(appConfig.expires_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).toUpperCase();
  return (
    <div className={styles.app}>
      <div className={styles.mainContainer}>
        <Layout appConfig={appConfig} />
      </div>
      <div className={styles.TsInfo}>
        <div className={styles.TSLogo}>
          <img src={TSLogo} alt="ThoughtSpot Logo" />
        </div>
        <div className={styles.appInfo}>
          <div>DEMO APP POWERED BY <span className={styles.underline}>THOUGHTSPOT</span></div>
          <div>AVAILABLE UNTIL {formattedDate}  |  72 VIEWS</div>
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
