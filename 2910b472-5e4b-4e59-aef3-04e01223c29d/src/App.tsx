import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import Layout from './components/Layout/Layout';
import TSLogo from '../assets/TSLogo.svg';
import { track, getCommonProperties } from './utils/tracking';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const appConfig = (window as any).APP_CONFIG || {};

const App: React.FC = () => {
  const appId: string | undefined = (() => {
    const fromConfig =
      appConfig?.appId ?? appConfig?.app_id ?? appConfig?.appID ?? appConfig?.app;
    if (typeof fromConfig === 'string' && fromConfig.trim()) {
      return fromConfig.trim();
    }
    // Fallback: published apps are served under /apps/:appId
    const match = window.location.pathname.match(/\/apps\/([^/]+)/);
    return match?.[1];
  })();

  const viewCountStorageKey = appId ? `spotbuild_view_count_${appId}` : undefined;
  const [viewCount, setViewCount] = useState<number>(() => {
    if (!viewCountStorageKey) return 0;
    const cached = sessionStorage.getItem(viewCountStorageKey);
    const parsed = cached ? Number(cached) : NaN;
    return Number.isFinite(parsed) ? parsed : 0;
  });

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
      ...getCommonProperties(appId),
      sampleAppExpiry: formattedDate,
    });

    const fetchViewCount = async (): Promise<void> => {
      if (!appId) return;

      try {
        const response = await fetch(
          document.location.origin + `/api/apps/${appId}/fetch-event`
        );
        if (response.ok) {
          const payload: unknown = await response.json();
          let count: number | null = null;
          if (typeof payload === 'number' && Number.isFinite(payload)) {
            count = payload;
          } else if (typeof payload === 'string') {
            const parsed = Number(payload);
            if (Number.isFinite(parsed)) count = parsed;
          } else if (payload && typeof payload === 'object') {
            const maybeCount = (payload as any).count;
            if (typeof maybeCount === 'number' && Number.isFinite(maybeCount)) count = maybeCount;
            if (typeof maybeCount === 'string') {
              const parsed = Number(maybeCount);
              if (Number.isFinite(parsed)) count = parsed;
            }
          }
          const finalCount = count ?? 0;
          setViewCount(finalCount);
          if (viewCountStorageKey) {
            sessionStorage.setItem(viewCountStorageKey, String(finalCount));
          }
        }
      } catch (error) {
        console.error('Failed to fetch view count:', error);
      }
    };

    fetchViewCount();
  }, [appId, formattedDate]);

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
            AVAILABLE UNTIL {formattedDate ?? ''} | {viewCount} VIEWS
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
                ...getCommonProperties(appId),
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
