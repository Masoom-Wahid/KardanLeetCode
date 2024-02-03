import React, { useState } from "react";
import DurationPicker from "./DurationPicker";
import styles from "./ContestDetailsForm.module.css";
import {useNavigate} from 'react-router-dom';

const ContestDetailsForm = ({contestData,setContestData}) => {
  const [duration, setDuration] = useState(contestData.duration);
  const [loading,setLoading] = useState(false)
  const [formattedDuration, setFormattedDuration] = useState(contestData.duration);
  const [name,setName] = useState(contestData.name)



  const navigate = useNavigate();



  const changeToMinute = data => {
    const [hours, minutes, seconds] = data.split(":").map(Number);
    const result = hours * 3600 + minutes * 60 + seconds;
    return result;
  }
  const handleDurationChange = (formattedDuration) => {
    setFormattedDuration(formattedDuration);

    // Set the duration in seconds if needed for your application logic
    const result = changeToMinute(formattedDuration)
    setDuration(result);
  };
  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true)
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}contest/${contestData.id}/`, {
        method: 'PUT',
        headers : {
          'Content-Type': 'application/json',
          "Authorization":`Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({name:name,
                              duration:formattedDuration}),
      });
      const data = await response.json()
      if(!response.ok){
        if (response.status === 401 || response.status === 403){
          localStorage.removeItem("accessToken")
          navigate("/")
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setContestData(data)
      window.alert("Updated")
      // Handle the response from the backend
    } catch (error) {
      // Handle errors
      console.error(error);
    }finally{
      setLoading(false)
    } 
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.inputGroup}>
          <label htmlFor="contestName" className={styles.label}>
            Contest Name
          </label>
          <input
            type="text"
            id="contestName"
            className={styles.input}
            onChange={(e) => setName(e.target.value)}
            value={name}
            defaultValue="Kardan University Contest"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="duration" className={styles.label}>
            Duration of the contest (in minutes)
          </label>
          <div className={styles.durationInputWrapper}>
            <DurationPicker
            contestDuration={contestData.duration}
            onChange={handleDurationChange} />
            <span className={styles.formattedDuration}>
              {formattedDuration && `Duration: ${formattedDuration}`}
            </span>
          </div>
        </div>
      </div>
      <button className={styles.saveButton} onClick={handleUpdate}>{loading ? "Upadating........" : "Save Changes"}</button>
    </>
  );
};

export default ContestDetailsForm;
