import React from "react";
import uniqueStyles from "./ManageContestsTabComponent.module.css"; // New unique CSS module

const ManageContestsTabsComponent = ({
  uniqueTabs,
  activeUniqueTab,
  setActiveUniqueTab,
}) => {
  return (
    <div className={uniqueStyles.uniqueTabs}>
      {uniqueTabs.map((tab) => (
        <button
          key={tab.id}
          className={`${uniqueStyles.uniqueTab} ${
            activeUniqueTab === tab.id ? uniqueStyles.active : ""
          }`}
          onClick={() => setActiveUniqueTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ManageContestsTabsComponent;
