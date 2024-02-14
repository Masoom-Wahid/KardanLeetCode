import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "./PurgeModal.module.css"; // The path to your module CSS file
import { useNavigate } from "react-router-dom"

const PurgeModal = ({ isOpen, onClose,contestData }) => {
  const navigate  = useNavigate();
  if (!isOpen) return null;

  
  const handleDelete = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}contest/${contestData.id}/`, {
        method: 'DELETE',
        headers : {
          'Content-type':'application/json',
          "Authorization":`Bearer ${localStorage.getItem("accessToken")}`

        },
      });
      if(!response.ok){
        if (response.status === 401 || response.status === 403){
          localStorage.removeItem("accessToken")
          navigate("/")
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      navigate("/contests")
      // Handle the response from the backend
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  }
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.header}>
          Are you sure you want to delete this contest?
        </p>
        <p className={styles.content}>
          This action is irreversible and cannot be undone, if you are sure
          click the delete button.
        </p>
        <button className={styles.deleteButton} onClick={() => handleDelete()} >
          <FontAwesomeIcon icon={faTrashAlt} />
          Delete
        </button>
        <button 
        className={styles.deleteButton} 
        onClick={() => onClose()} 
        style={{backgroundColor:'blue'}}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
          Close
        </button>
      </div>
    </div>
  );
};

export default PurgeModal;
