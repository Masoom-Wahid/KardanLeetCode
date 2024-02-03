import React, { useState } from "react";
import styles from "./AddChallengeModal.module.css";
import {useNavigate} from 'react-router-dom';


const AddChallengeModal = ({ closeModal ,questionIds,setQuestionIds,questions,setQuestions,contestName }) => {
  const [challengeInput, setChallengeInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected,setSelected] = useState(false)

  const navigate = useNavigate()
  const handleSearch = async () => {
      try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}questions/search/?title=${challengeInput}&name=${contestName}`, {
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
          setSuggestions(data);
          // Process the data
        } catch (error) {
          // Handle errors
          console.error(error);
        }
  }

  const handleSelect = (data) => {
    setChallengeInput(data.title)
    setSelected(data)
    setSuggestions([])
  }
  const handleInputChange = (event) => {
    const input = event.target.value;
    setChallengeInput(input);
  };

  const handleAdding = async () => {
    if (!selected){
      window.alert("Please Search Before Adding A Question")
    }
    let temp = questionIds
    temp.push(selected.id)
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}contest/setQuestions/`, {
        method: 'POST',
        headers : {
          'Content-Type': 'application/json',
          "Authorization":`Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({name:contestName,ids:temp.join(",")}),
      });
      if(!response.ok){
        if (response.status === 401 || response.status === 403){
          localStorage.removeItem("accessToken")
          navigate("/")
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let anothertemp = questions
      anothertemp.push(selected)
      setQuestions(anothertemp)
      setQuestionIds(temp)
      setSelected(false)
      closeModal();
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>Add Challenge</h2>
        <label className={styles.subtitle} htmlFor="challenge-name">
          Enter The Name or ID of the Challenge
        </label>
        <input
          id="challenge-name"
          type="text"
          value={challengeInput}
          onChange={handleInputChange}
          autoComplete="off"
        />
        {challengeInput && (
          <ul className={styles.suggestions}>
            {suggestions && (
              suggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() => handleSelect(suggestion)}
                >
                  {suggestion.title}
                </li>
              ))
            )}
          </ul>
        )}
        <button className={styles.buttons} onClick={handleAdding}>
          ADD
        </button>
        <button className={styles.buttons} onClick={handleSearch} >Search</button>
      </div>
      <div className={styles.modalOverlay} onClick={closeModal} />
    </div>
  );
};

export default AddChallengeModal;
