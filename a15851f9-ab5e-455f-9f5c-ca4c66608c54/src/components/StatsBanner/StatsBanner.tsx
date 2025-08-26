import styles from './StatsBanner.module.scss';
import { useMemo } from 'react';

interface StatsBannerProps {
  currentViews: number;
  totalViews: number;
  expirationDate: string;
}

const StatsBanner = ({
  currentViews,
  totalViews,
  expirationDate,
}: StatsBannerProps) => {
  const daysLeft = useMemo(() => {
    const exp = new Date(expirationDate);
    if (Number.isNaN(exp.getTime())) return '-';
    // Calculate difference in full days, rounding up so any remainder counts as a full day
    return Math.max(
      0,
      Math.ceil((exp.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    );
  }, [expirationDate]);
  return (
    <div className={styles.banner}>
      <div className={styles.item}>
        <span className={styles.value}>{currentViews.toLocaleString()}</span>
        <span className={styles.label}>Current Views</span>
      </div>
      <div className={styles.separator} />
      <div className={styles.item}>
        <span className={styles.value}>{totalViews.toLocaleString()}</span>
        <span className={styles.label}>Total Views</span>
      </div>
      <div className={styles.separator} />
      <div className={styles.item}>
        <span className={styles.value}>{expirationDate}</span>
        <span className={styles.label}>Expires</span>
      </div>
      <div className={styles.separator} />
      <div className={styles.item}>
        <span className={styles.value}>{daysLeft}</span>
        <span className={styles.label}>Days Left</span>
      </div>
    </div>
  );
};

export default StatsBanner;
