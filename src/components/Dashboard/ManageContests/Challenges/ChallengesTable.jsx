// ChallengesTable.js
import React, { useState,useEffect } from "react";
import styles from "./ChallengesTable.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import AddChallengeModal from "./AddChallengeModal";
import {useNavigate} from 'react-router-dom'

const ChallengesTable = ({contestData}) => {
  const [showModal, setShowModal] = useState(false);
  const [questions,setQuestions] = useState([])
  const [questionIds,setQuestionIds] = useState([]);
  const toggleModal = () => setShowModal(!showModal);


  const handleDelete = async (id) => {
    const temp = questionIds.filter((questionsId) => questionsId !== id);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}contest/setQuestions/`, {
        method: 'POST',
        headers : {
          'Content-Type': 'application/json',
          "Authorization":`Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({name:contestData.name,ids:temp.join(",")}),
      });
      if(!response.ok){
        if (response.status === 401 || response.status === 403){
          localStorage.removeItem("accessToken")
          navigate("/")
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setQuestionIds(temp)
      const questions_filtered = questions.filter((question) => question.id !== id)
      setQuestions(questions_filtered)

    } catch (error) {
      // Handle errors
      console.error(error);
    }
  }

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}questions/?name=${contestData.name}`, {
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
        if (response.status === 204){
          setQuestions([])
          setQuestionIds([])
        }else{
          setQuestions(data.data);
          let temp=[];
          data.data.forEach(data => {
            temp.push(data.id)
          });
          setQuestionIds(temp);
        }
        // Process the data
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    };
    fetchData();
  },[]);





  return (
    <>
      <div>
        <h1 className={styles.title}>Challenges</h1>
        <table className={styles.challengesTable}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Level</th>
              <th>Max Score</th>
              <th>Time Limit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              questions && (
                questions.map((challenge, index) => (
                  
                  (
                    <tr key={challenge.id}>
                      <td>{index + 1}</td>
                      <td>{challenge.title}</td>
                      <td>{challenge.lvl}</td>
                      <td>{challenge.point}</td>
                      <td>{challenge.time_limit}</td>
                      <td className={styles.actionIcon}>
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          onClick={() => handleDelete(challenge.id)}
                          className={styles.actionIcon + ' ' + styles.delete}
                        />
                        <FontAwesomeIcon
                          icon={faPencilAlt}
                          className={styles.actionIcon + ' ' + styles.edit}
                          onClick={() => navigate(`/challenges/${challenge.id}`)}
                        />
                      </td>
                    </tr>
                  )
              )
            ))}
          </tbody>
        </table>
        <button className={styles.addButton} onClick={toggleModal}>
          Add Challenge
        </button>
      </div>
      {showModal && <AddChallengeModal  
      contestName = {contestData.name}
      questions={questions}
      questionIds={questionIds}
      setQuestionIds={setQuestionIds}
      setQuestions={setQuestions}
      closeModal={toggleModal} />}
    </>
  );
};

export default ChallengesTable;
