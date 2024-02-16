import React from "react";
import styles from "ReportsPage.module.css";
import Reports from "./Reports";

const ReportsPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Reports</h1>
      <button className={styles.exportButton}>Export PDF</button>
      <Reports />
    </div>
  );
};

export default ReportsPage;
