// CreateContestant.jsx
import React, { useState } from "react";
import styles from "./CreateContestant.module.css";
import { useNavigate } from "react-router-dom";
import {useParams} from 'react-router-dom'

const CreateContestant = () => {
  const [numberOfUsers, setNumberOfUsers] = useState("");
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();

  const { id } = useParams();
  // Just To be sure that the id is not undefind and is also a number since the contest primary key is always a number 
  // meaning it is autoID
  if (id === undefined){
    if(!isNaN(id)) navigate("/admin")
    
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}auth/users/`, {
        method: 'POST',
        headers : {
          'Content-type':'application/json',
          "Authorization":`Bearer ${localStorage.getItem("accessToken")}`

        },
        body: JSON.stringify({type:"contest",
                              amount:numberOfUsers,
                              contest_id:id
                              }),
      });
      if(!response.ok){
        if (response.status === 401 || response.status === 403){
          localStorage.removeItem("accessToken")
          navigate("/")
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      navigate("/admin")
      // Handle the response from the backend
    } catch (error) {
      // Handle errors
      console.error(error);
    }finally{
      setLoading(false)
    }
    
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img
          src="/logo.png"
          alt="Kardan University Logo"
          className={styles.icon}
        />
        <h2 className={styles.title}>Create Contestant Users</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="numberOfUsers" className={styles.inputLabel}>
              How many users do you want to create?
            </label>
            <input
              type="number"
              id="numberOfUsers"
              className={styles.inputField}
              value={numberOfUsers}
              onChange={(e) => setNumberOfUsers(e.target.value)}
              required
            />
          </div>
          <button
            className={styles.submitButton}
          >
            {loading ?  "Creating .... " : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateContestant;
