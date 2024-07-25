import React from 'react';
import NoResults from '../assets/no-results.webp';
import styles from '../styles/NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.NotFound}>
      <div className={styles.NotFoundContent}>
        <img src={NoResults} alt="No results" />
        <p>
          Our apologies, this page must have gotten eaten by a shark! Surface
          and head back to the home page.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
