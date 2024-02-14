import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TabsComponent from "./TabsComponent";
import ChallengeDetails from "./ChallengeDetails";
import TestCasesTab from "./TestCasesTab";
import styles from "./ParentComponent.module.css"; // Assume your CSS module for layout
import { useNavigate } from "react-router-dom";
import SampleTestCases from "./SampleTestCases";
import Constraints from "./Constraints";

const ParentComponent = () => {
  const [activeTab, setActiveTab] = useState("Challenge");
  const [testCases, setTestCases] = useState();
  const [filesRequired, setFilesRequired] = useState(false);
  const [avaiableTestCases, setAvailableTestCases] = useState();
  const [question, setQuestion] = useState();
  const [sample, setSample] = useState([]);
  const [constraints, setConstraints] = useState([]);
  const { id } = useParams();

  // Define the tab data
  const tabs = [
    { id: "Challenge", label: "Challenge" },
    { id: "TestCases", label: "Test Cases" },
    { id: "Samples", label: "Samples" },
    { id: "Constraints", label: "Constraints" },
  ];

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}questions/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

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
        setQuestion(data.question);
        setTestCases(data.testcases.num_of_test_cases);
        setAvailableTestCases(data.testcases.avaialabe_test_cases);
        setFilesRequired(data.testcases.files_required);
        setSample(data.samples);
        setConstraints(data.consts.length <= 0 ?  undefined : data.consts[0]);

        // Process the data
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Render content based on active tab
  const renderTabContent = (tab) => {
    switch (tab) {
      case "Challenge":
        return (
          <ChallengeDetails question={question} setQuestion={setQuestion} />
        );
      case "TestCases":
        return (
          <TestCasesTab
            questionId={question.id}
            avaiableTestCases={avaiableTestCases}
            setAvailableTestCases={setAvailableTestCases}
            testCases={testCases}
            filesRequired={filesRequired}
            setFilesRequired={setFilesRequired}
          />
        );
      case "Samples":
        return <SampleTestCases 
        sample={sample}
        setsample={setSample}
        questionId={question.id}
        />;
      case "Constraints":
        return <Constraints
          consts={constraints}
          setconsts={setConstraints}
          questionId={question.id}
        />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
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
