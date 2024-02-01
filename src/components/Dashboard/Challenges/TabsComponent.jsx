import React from "react";
import styles from "./TabsComponent.module.css";

const TabsComponent = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tab} ${
            activeTab === tab.id ? styles.active : ""
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabsComponent;
