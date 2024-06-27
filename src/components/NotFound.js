import React from "react";
import NoResults from "../assets/no-results.png";
import styles from "../styles/NotFound.module.css";
import Asset from "./Asset";

const NotFound = () => {
  return (
    <div className={styles.NotFound}>
      <Asset
        src={NoResults}
        message={`Our apologies, this page must have gotten eaten by a shark! Surface and head back to the home page.`}
      />
    </div>
  );
};

export default NotFound;