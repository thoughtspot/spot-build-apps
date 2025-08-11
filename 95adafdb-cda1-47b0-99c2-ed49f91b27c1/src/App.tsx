import React from 'react';
import styles from './App.module.scss';
import Layout from './components/Layout/Layout';
import appConfig from './config/appConfig';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Layout appConfig={appConfig} />
    </div>
  );
};

export default App;
