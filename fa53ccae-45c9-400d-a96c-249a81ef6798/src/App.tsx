import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import Layout from './components/Layout/Layout';
import TSLogo from '../assets/TSLogo.svg';
import { track, getCommonProperties } from './utils/tracking';

const App: React.FC = () => {
  // Read APP_CONFIG from window inside component to ensure we get the latest value
  // This ensures we always read the current value, not a stale module-level constant
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const appConfig = (window as any).APP_CONFIG || {};

  const [viewCount, setViewCount] = useState<number | null>(null);

  let formattedDate: string | undefined;
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
      sampleAppExpiry: formattedDate,
    });

    const fetchViewCount = async (): Promise<void> => {
      if (!appConfig?.appId) return;

      try {
        const response = await fetch(
          document.location.origin + `/api/apps/${appConfig.appId}/fetch-event`
        );
        if (response.ok) {
          const count = await response.json();
          setViewCount(typeof count === 'number' ? count : 0);
        }
      } catch (error) {
        console.error('Failed to fetch view count:', error);
      }
    };

    fetchViewCount();
  }, [appConfig.appId, formattedDate]);

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
          <div>
            AVAILABLE UNTIL {formattedDate ?? ''} | {viewCount ?? '—'} VIEWS
          </div>
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
