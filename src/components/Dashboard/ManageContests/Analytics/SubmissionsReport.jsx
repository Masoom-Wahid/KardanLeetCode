import React, { useState } from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import DataTableView from "./DataTable";
import styles from "./NivoBar.module.css";

const SubmissionsReport = () => {
  const [vertOrHor, setVertOrHor] = useState("vertical");
  const [viewType, setViewType] = useState("Graph");
  const view = [
    {
      vertical: "Vertical",
    },
    {
      horizontal: "Horizontal",
    },
  ];

  const teamNames = [
    "alpha",
    "beta",
    "gamma",
    "delta",
    "epsilon",
    "zeta",
    "eta",
    "theta",
    "iota",
    "kappa",
  ];

  const generateSubmissionsForQuestion = (questionNumber) => {
    return teamNames.map((teamName, index) => ({
      id: `q${questionNumber}sub${index + 1}`,
      teamName: teamName,
      status: Math.random() < 0.5 ? "correct" : "incorrect",
    }));
  };

  const generateBarData = (numQuestions) => {
    const barData = [];

    for (let i = 1; i <= numQuestions; i++) {
      barData.push({
        question: `Question ${i}`,
        submissions: generateSubmissionsForQuestion(i),
      });
    }

    return barData;
  };

  // Now generate barData with 10 questions, each with at least 8 submissions
  const barData = generateBarData(5);

  const processDataForBarChart = (submissionsData) => {
    return submissionsData.map((questionItem) => {
      const dataPoint = {
        question: questionItem.question,
        submissions: questionItem.submissions, // Include the submissions array
        details: {}, // As previously defined
      };

      // Populate the details object and set block values as before
      questionItem.submissions.forEach((submission) => {
        dataPoint[submission.id] = 1; // This creates the block
        dataPoint.details[submission.id] = {
          teamName: submission.teamName,
          status: submission.status,
        }; // This adds the detail for the tooltip
      });

      return dataPoint;
    });
  };

  const allKeys = barData.flatMap((questionItem) =>
    questionItem.submissions.map((submission) => submission.id)
  );

  const getColor = (bar) => {
    // Assuming the 'bar' object contains an 'id' that matches your submission ID
    // And 'data' is your barData that contains the 'submissions' array
    const submission = bar.data.submissions.find((s) => s.id === bar.id);
    return submission && submission.status === "correct"
      ? "#4AA785"
      : "#EF452F";
  };

  const MyResponsiveBar = ({ data, vertOrHor }) => (
    <ResponsiveBar
      data={data}
      keys={allKeys}
      indexBy="question"
      layout={vertOrHor}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={getColor}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      innerPadding={1}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Question",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Submissions",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      tooltip={({ id, value, data }) => {
        // Access the detailed information from the 'details' object
        const detail = data.details[id];
        if (detail) {
          return (
            <div
              style={{
                padding: 12,
                background: "#fff",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              <strong>Team: {detail.teamName}</strong>
              <br />
              Status: {detail.status}
            </div>
          );
        } else {
          // Handle the case where the detail is not available
          return <div>No data available</div>;
        }
      }}
      role="application"
      ariaLabel="Contest Calculations"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " have status: " + e.indexValue;
      }}
    />
  );

  MyResponsiveBar.propTypes = {
    data: PropTypes.array.isRequired, // Corrected to array
    vertOrHor: PropTypes.string.isRequired,
  };

  return (
    <>
      <CCard className={styles.card}>
        <CCardHeader className={styles.cardHeader}>
          <CRow>
            <CCol sm={6}>
              <h4 className={styles.cardTitle}>Total Submissions Stats</h4>
            </CCol>
            <div className={styles.buttons}>
              {viewType === "Graph" && (
                <div className={styles.chartButtonGroup}>
                  {view.map((value) => (
                    <button
                      className={`${styles.button} ${
                        vertOrHor === value.horizontal ? styles.active : ""
                      }`}
                      onClick={() => setVertOrHor(value.horizontal)}
                      key={value.horizontal}
                    >
                      {value.horizontal}
                      {value.vertical}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </CRow>
        </CCardHeader>
        <CCardBody className={styles.cardBody}>
          {viewType === "Graph" ? (
            <MyResponsiveBar
              data={processDataForBarChart(barData)} // Corrected data processing
              vertOrHor={vertOrHor}
            />
          ) : (
            <DataTableView tableData={barData} />
          )}
        </CCardBody>
      </CCard>
    </>
  );
};
export default SubmissionsReport;
