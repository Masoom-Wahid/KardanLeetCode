import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Pagination.module.css"; 

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const goToPage = (page) => {
    onPageChange(page);
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => goToPage(1)}
        disabled={currentPage === 1}
        className={styles.pageItem}
      >
        <FontAwesomeIcon icon={faAngleDoubleLeft} />
      </button>
      <button
        onClick={() => goToPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={styles.pageItem}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => goToPage(number)}
          className={`${styles.pageItem} ${
            currentPage === number ? styles.active : ""
          }`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={styles.pageItem}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
      <button
        onClick={() => goToPage(totalPages)}
        disabled={currentPage === totalPages}
        className={styles.pageItem}
      >
        <FontAwesomeIcon icon={faAngleDoubleRight} />
      </button>
    </div>
  );
};

export default Pagination;
