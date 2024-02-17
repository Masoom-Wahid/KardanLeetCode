import React, { useState } from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import DataTableView from "./DataTable";
import styles from "./SubmissionsReport.module.css";
import { patternLinesDef } from "@nivo/core";

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

  //if you have an array the data shuold be given like this:
  //barData = {
  //question: "question 1",
  //submissions: [
  //{id: "q1sub1", teamName: "alpha", status: "correct"}
  //{id: "q1sub2", teamName: "beta", status: "incorrect"}
  //]
  //}

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

  const barData = generateBarData(10);

  const processDataForBarChart = (submissionsData) => {
    return submissionsData.map((questionItem) => {
      const dataPoint = {
        question: questionItem.question,
        submissions: questionItem.submissions,
        details: {}, // As previously defined
      };

      questionItem.submissions.forEach((submission) => {
        dataPoint[submission.id] = 1;
        dataPoint.details[submission.id] = {
          teamName: submission.teamName,
          status: submission.status,
        };
      });

      return dataPoint;
    });
  };

  const allKeys = barData.flatMap((questionItem) =>
    questionItem.submissions.map((submission) => submission.id)
  );

  const getColor = (bar) => {
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
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      innerPadding={1}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      defs={[
        patternLinesDef("lines-pattern", {
          spacing: 10,
          rotation: -29,
          lineWidth: 2,
          background: "#000000",
          color: "#ffffff",
        }),
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
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
      tooltip={({ id, value, data }) => {
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
          //if data is not there.
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
    data: PropTypes.array.isRequired,
    vertOrHor: PropTypes.string.isRequired,
  };

  return (
    <>
      <CCard className={styles.submissionsCard}>
        <CCardHeader className={styles.submissionsCardHeader}>
          <CRow>
            <CCol sm={6}>
              <h4 className={styles.submissionsCardTitle}>
                Total Submissions Stats
              </h4>
            </CCol>
            <div className={styles.submissionsButtons}>
              {viewType === "Graph" && (
                <div className={styles.submissionsChartButtonGroup}>
                  {view.map((value) => (
                    <button
                      className={`${styles.submissionsButton} ${
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
        <CCardBody className={styles.submissionsCardBody}>
          {viewType === "Graph" ? (
            <MyResponsiveBar
              data={processDataForBarChart(barData)}
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
