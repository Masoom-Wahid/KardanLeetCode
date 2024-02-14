import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faFlagCheckered,
  faBan,
  faStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./AdvanceSetting.module.css"; 
import PurgeModal from "./PurgeModal";
import { useSnackbarConfetti } from "../../../Helpers/useSnackbarConfetti";
import { useNavigate } from "react-router-dom"

const AdvanceSetting = ({contestData,setContestData}) => {
  const [isPurgeModalOpen, setPurgeModalOpen] = useState(false);
  const openPurgeModal = () => setPurgeModalOpen(true);
  const closePurgeModal = () => setPurgeModalOpen(false);
  const { trigger, SnackBar } = useSnackbarConfetti({
    backgroundColor: "#306AFF",
  });

  const navigate = useNavigate();

  const handleActions = async (action,type,text) => {
    var temp_type;
    switch(type){
      case "starred":
        temp_type = "star";
        break
      case "started":
        temp_type = "start";
        break
      case "finished":
        temp_type="finish"
        break
      default:
        temp_type = type;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}contest/actions/`, {
        method: 'POST',
        headers : {
          'Content-type':'application/json',
          "Authorization":`Bearer ${localStorage.getItem("accessToken")}`

        },
        body: JSON.stringify({name:contestData.name,
                              action:`${action}_${temp_type}`,
                              }),
      });
      if(!response.ok){
        if (response.status === 401 || response.status === 403){
          localStorage.removeItem("accessToken")
          navigate("/")
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setContestData(prev => {
        return {
          ...prev, // Spread the previous state to create a new object
          [type]: action === "do" ? true : false // Update the value of the 'type' key based on the condition
        };
      });
      trigger(text)

      // Handle the response from the backend
    } catch (error) {
      // Handle errors
      console.error(error);
    }finally{
      
    }

  }


  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.column}>
          {
            contestData.starred && !contestData.finished && !contestData.started ? 
            <button
            className={styles.button}
            onClick={() =>  handleActions("do","started","Contest Started")}
            >
            <FontAwesomeIcon icon={faPlay} className={styles.icon} />
            Start Contest
            </button> : <></>
          }
          
          {
            contestData.starred && contestData.started && !contestData.finished ? 
            <button
              className={styles.button}
              onClick={() =>  handleActions("do","finished","Contest has been ended manually")}
            >
              <FontAwesomeIcon icon={faFlagCheckered} className={styles.icon} />
              End Contest
            </button> : <></>
          }

          <button className={styles.button} onClick={openPurgeModal}>
            <FontAwesomeIcon icon={faBan} className={styles.icon} />
            Purge Contest
          </button>
        </div>

        <div className={styles.column}>
          {
            //Only show these when the contest has not started and has not finished
            !contestData.finished  && !contestData.started ?
            !contestData.starred ? 
          <button
            className={styles.button}
            onClick={() => handleActions("do","starred","Contest Starred")}
          >
            <FontAwesomeIcon icon={faStar} className={styles.icon} />
            Star Contest
          </button>
            :
          <button
            className={styles.button}
            onClick={() => handleActions("undo","starred","Contest Unstarred")}
          >
            <FontAwesomeIcon icon={faStarHalfAlt} className={styles.icon} />
            UnStar Contest
          </button>
          :<></>
          }
        </div>
        <PurgeModal isOpen={isPurgeModalOpen} onClose={closePurgeModal} contestData={contestData}/>
        <SnackBar />
      </div>
    </>
  );
};

export default AdvanceSetting;
