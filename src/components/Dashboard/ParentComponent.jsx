import React, { useState } from "react";
import TabsComponent from "./TabsComponent";
import ChallengeDetails from "./ChallengeDetails";
import TestCasesTab from "./TestCasesTab";
import Sidebar from "./Sidebar";
import styles from "./ParentComponent.module.css"; // Assume your CSS module for layout
import SampleTestCases from "./SampleTestCases";
import Constraints from "./Constraints";

const ParentComponent = () => {
  const [activeTab, setActiveTab] = useState("Challenge");

  // Define the tab data
  const tabs = [
    { id: "Challenge", label: "Challenge" },
    { id: "TestCases", label: "Test Cases" },
    { id: "Samples", label: "Samples" },
    { id: "Constraints", label: "Constraints" },
  ];

  // Render content based on active tab
  const renderTabContent = (tab) => {
    switch (tab) {
      case "Challenge":
        return <ChallengeDetails />;
      case "TestCases":
        return <TestCasesTab />;
      case "Samples":
        return <SampleTestCases />;
      case "Constraints":
        return <Constraints />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.contentArea}>
        <TabsComponent
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {renderTabContent(activeTab)}
      </div>
    </div>
  );
};

export default ParentComponent;
