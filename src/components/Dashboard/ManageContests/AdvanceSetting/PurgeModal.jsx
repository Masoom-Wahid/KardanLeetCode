import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "./PurgeModal.module.css"; // The path to your module CSS file

const PurgeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

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
        <button className={styles.deleteButton} onClick={onClose}>
          <FontAwesomeIcon icon={faTrashAlt} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default PurgeModal;
