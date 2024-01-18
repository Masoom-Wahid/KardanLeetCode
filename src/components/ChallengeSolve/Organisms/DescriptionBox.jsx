import React, { useState,useEffect } from "react";
import styles from "./DescriptionBox.module.css";
import {useNavigate} from 'react-router-dom';


const BASE_URL = process.env.REACT_APP_API_URL;
const QUESTION_ID = 21


const DescriptionBox = () => {
  const [tabValue, setTabValue] = useState(0);
  const [challenge,setChallenge] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}competition/${QUESTION_ID}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });


      const data = await response.json();
        if (!response.ok) {
          console.log(response.status)
          // 401 means unauthorized , 403 means unauthorized, so the user is either using an old token or is 
          // either bypassing 
          if (response.status === 401 || response.status === 403){
            localStorage.removeItem("accessToken")
            navigate("/")
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setChallenge(data)
        // Process the data
      } catch (error) {
        // Handle errors
        console.error(error);
      }
}
    fetchData()
},[]);


  return (
    <div className={styles.descriptionBox}>
      <div className={styles.tabContainer}>
        <div
          className={`${styles.tab} ${
            tabValue === 0 ? styles.tabSelected : ""
          }`}
          onClick={() => setTabValue(0)}
        >
          Description
        </div>
        <div
          className={`${styles.tab} ${
            tabValue === 1 ? styles.tabSelected : ""
          }`}
          onClick={() => setTabValue(1)}
        >
          Submissions
        </div>
      </div>
      {/* i tried other ways but for some reason the useEffect would not load quickly , so i had to do it this way
        see if u can do it better , i am sure there is a better way
      */}
      {tabValue === 0 && challenge.question != undefined && (
        <div className={styles.contentBox}>
          <h5 className={styles.title}>{challenge.question.title}</h5>
          <div className={styles.difficulty}>
            Difficulty: {challenge.question.lvl}
          </div>
          <p className={styles.description}>{challenge.question.description}</p>
          {challenge.test_cases.map((example) => (
            <div key={example.id} className={styles.exampleBox}>
              <p className={styles.exampleInput}>
                <b>Input:</b> {example.sample}
              </p>
              <p className={styles.exampleOutput}>
                <b>Output:</b> {example.answer}
              </p>
              <p className={styles.exampleExplanation}>
                <b>Explanation:</b> {example.explanation}
              </p>
            </div>
          ))}
        </div>
      )}
      {/* Additional content for other tab values can be added here */}
    </div>
  );
};

export default DescriptionBox;
