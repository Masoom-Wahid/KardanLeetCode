import React, { useState,useEffect } from "react";
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
import {useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

// Replace these with your actual component imports
const DetailsComponent = ({contestData,setContestData}) => (
  <div>
    <ContestDetailsForm  contestData={contestData} setContestData={setContestData} />
  </div>
);
const ChallengesComponent = ({contestData}) => (
  <div>
    <ChallengesTable contestData={contestData} />
  </div>
);
const LeaderboardComponent = ({contestData}) => (
  <div>
    <LeaderboardPage  contestData={contestData} />
  </div>
);
const AnalyticsComponent = ({contestData}) => <ManageContest contestData={contestData}  />;
const UsersComponent = ({contestData}) => (
  <div>
    <CreateContestant  contestData={contestData} />
  </div>
);

const ManageContestsParentComponent = () => {
  const [activeUniqueTab, setActiveUniqueTab] = useState("Details");
  const { id } = useParams();
  const navigate = useNavigate();
  const [contestData,setContestData] = useState()

  if(id === undefined){
    window.alert("id  required")
    navigate("/contests")
  }
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}contest/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          // 401 means unauthorized , 403 means unauthorized, so the user is either using an old token or is
          // either bypassing
          if (response.status === 401 || response.status === 403) {
            localStorage.removeItem("accessToken");
            navigate("/");
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setContestData(data);
        // Process the data
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    };
    fetchData();
  },[]);

  const renderUniqueTabContent = (tab) => {
    switch (tab) {
      case "Details":
        return <DetailsComponent  contestData={contestData} setContestData={setContestData} />;
      case "Challenges":
        return <ChallengesComponent  contestData={contestData} />;
      case "Leaderboard":
        return <LeaderboardComponent  contestData={contestData} />;
      case "Analytics":
        return <AnalyticsComponent  contestData={contestData} />;
      case "Users":
        return <Users contestData={contestData} />;
      case "Submissions":
        return <SubmissionsList  contestData={contestData} />;
      case "AdvanceSetting":
        return <AdvanceSetting  contestData={contestData} />;
      default:
        return null; // or <DefaultComponent />
    }
  };

  return (
    <div className={uniqueStyles.uniqueContainer}>
      {
        contestData && (
          <>
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
          </>
          )
        }
    </div>
  );
};

export default ManageContestsParentComponent;
