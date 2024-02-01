import React, { useState } from "react";
import ManageContestsTabsComponent from "./ManageContestsTabComponent";
import uniqueStyles from "./ManageContestsParentComponent.module.css";
import CreateContestant from "../../Contest/CreateContestant";
import ManageContest from "../Analytics/ManageContest";
import LeaderboardPage from "../../../LeaderBoard/Organisms/LeaderboardPage";
import ChallengesTable from "../Challenges/ChallengesTable";
import ContestDetailsForm from "../Contest/ContestDetailsForm";
import AdvanceSetting from "../AdvanceSetting/AdvanceSetting";
import Users from "../../Users/Users";
import SubmissionsList from "../Submissions/SubmissionsList";

// Replace these with your actual component imports
const DetailsComponent = () => (
  <div>
    <ContestDetailsForm />
  </div>
);
const ChallengesComponent = () => (
  <div>
    <ChallengesTable />
  </div>
);
const LeaderboardComponent = () => (
  <div>
    <LeaderboardPage />
  </div>
);
const AnalyticsComponent = () => <ManageContest />;
const UsersComponent = () => (
  <div>
    <CreateContestant />
  </div>
);

const ManageContestsParentComponent = () => {
  const [activeUniqueTab, setActiveUniqueTab] = useState("Details");

  const renderUniqueTabContent = (tab) => {
    switch (tab) {
      case "Details":
        return <DetailsComponent />;
      case "Challenges":
        return <ChallengesComponent />;
      case "Leaderboard":
        return <LeaderboardComponent />;
      case "Analytics":
        return <AnalyticsComponent />;
      case "Users":
        return <Users />;
      case "Submissions":
        return <SubmissionsList />;
      case "AdvanceSetting":
        return <AdvanceSetting />;
      default:
        return null; // or <DefaultComponent />
    }
  };

  return (
    <div className={uniqueStyles.uniqueContainer}>
      <div className={uniqueStyles.uniqueContentArea}>
        <ManageContestsTabsComponent
          uniqueTabs={[
            { id: "Details", label: "Details" },
            { id: "Challenges", label: "Challenges" },
            { id: "Leaderboard", label: "Leaderboard" },
            { id: "Analytics", label: "Analytics" },
            { id: "Users", label: "Users" },
            { id: "Submissions", label: "Submissions" },
            { id: "AdvanceSetting", label: "Advance Setting" },
          ]}
          activeUniqueTab={activeUniqueTab}
          setActiveUniqueTab={setActiveUniqueTab}
        />
        {renderUniqueTabContent(activeUniqueTab)}
      </div>
    </div>
  );
};

export default ManageContestsParentComponent;
