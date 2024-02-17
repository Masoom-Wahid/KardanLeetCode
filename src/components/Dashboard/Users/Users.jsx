import React, { useEffect, useState } from "react";
import styles from "./Users.module.css"; // CSS Module for Users
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Pagination from "../../Pagination/Pagination";
import { faCaretUp, faCaretDown,faDownload } from "@fortawesome/free-solid-svg-icons";
import SubmissionsList from "../ManageContests/Submissions/SubmissionsList";
import ReportPDF from "../ManageContests/Reports/ReportPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import styleCss from "../ManageContests/Reports/Reports.module.css";

const Users = ({contestData}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.usersContainer}>
          <h1 className={styles.title}>Users</h1>
          <button
            className={styles.addButton}
            onClick={() => navigate(`/createContestant/${contestData.id}`)}
          >
            <FontAwesomeIcon icon={faPlus} />
            Add New
          </button>
          <div className={styles.addButton}>
            <PDFDownloadLink
              document={<ReportPDF type={"creds"} contestData={contestData} />}
              fileName={`${contestData.name}__creds.pdf`}
            >
              {({ loading }) => (
                <button className={styleCss.addButton} disabled={loading}>
                  Expot Credentials
                </button>
              )}
            </PDFDownloadLink>
          </div>
          <SubmissionsList
            className={styles.submit}
            contestData={contestData}
            usersTab={true}
          />
        </div>
      </div>
    </>
  );
};

export default Users;
