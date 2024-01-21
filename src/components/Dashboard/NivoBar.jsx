import React, { useState } from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import DataTableView from "./DataTable";
import styles from "./NivoBar.module.css";

const NivoBar = () => {
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

  const barData = [
    {
      status: "Correct",
      Correct: 121,
      CorrectColor: "hsl(13, 10%, 5%)",
    },
    {
      status: "Incorrect",
      Incorrect: 162,
      IncorrectColor: "hsl(258, 70%, 50%)",
    },
    {
      status: "In Progress",
      "In Progress": 110,
      "In ProgressColor": "hsl(25, 70%, 50%)",
    },
    {
      status: "Pending",
      Pending: 100,
      PendingColor: "hsl(25, 70%, 50%)",
    },
  ];

  const MyResponsiveBar = ({ data, vertOrHor }) => (
    <ResponsiveBar
      data={data}
      keys={["Correct", "Incorrect", "Pending", "In Progress"]}
      indexBy="status"
      layout={vertOrHor}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.5}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={["#4AA785", "#EF452F", "#59A8D4", "#8A8CD9"]}
      style={{
        borderRadius: "10px",
      }}
      defs={[
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
          color: "#95A4FC",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: vertOrHor === "vertical" ? "Status" : "",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: vertOrHor === "vertical" ? "" : "Status",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={20}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right", //'top', // '
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 30,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      tooltip={({ id, value, color }) => (
        <div
          style={{
            padding: 12,
            color,
            background: "#222222",
          }}
        >
          <span>Bar Graph Value</span>
          <br />
          <strong>
            {id}: {value}
          </strong>
        </div>
      )}
      role="application"
      ariaLabel="Contest Calculations"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " have status: " + e.indexValue;
      }}
    />
  );

  MyResponsiveBar.propTypes = {
    data: PropTypes.object.isRequired,
    vertOrHor: PropTypes.string.isRequired,
  };

  return (
    <>
      <CCard className={styles.card}>
        <CCardHeader className={styles.cardHeader}>
          <CRow>
            <CCol sm={6}>
              <h4 className={styles.cardTitle}>Total Challenges Stats</h4>
            </CCol>
            <div className={styles.buttons}>
              <div className={styles.buttonGroup}>
                {["Graph", "Data"].map((value) => (
                  <button
                    className={`${styles.button} ${
                      viewType === value ? styles.active : ""
                    }`}
                    onClick={() => setViewType(value)}
                    key={value}
                  >
                    {value}
                  </button>
                ))}
              </div>
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
            <MyResponsiveBar data={barData} vertOrHor={vertOrHor} />
          ) : (
            <DataTableView tableData={barData} />
          )}
        </CCardBody>
      </CCard>
    </>
  );
};
export default NivoBar;
