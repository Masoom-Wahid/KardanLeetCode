import React, { useState } from "react";
import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line"; // Import the line chart component
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import DataTableView from "./DataTable";
import styles from "./NivoLine.module.css";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NivoLine = () => {
  const [viewType, setViewType] = useState("Graph");

  // Data format for line chart
  const lineData = [
    {
      id: "This Contest",
      data: [
        { x: "2021", y: 10 },
        { x: "2022", y: 20 },
        { x: "2023", y: 25 },
        { x: "2024", y: 30 },
      ],
    },
    {
      id: "Last Contests",
      data: [
        { x: "2021", y: 15 },
        { x: "2022", y: 10 },
        { x: "2023", y: 20 },
        { x: "2024", y: 25 },
      ],
    },
  ];

  const MyResponsiveLine = ({ data }) => (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Year",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Value",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      colors={["#000", "#A8C5DA"]}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
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
    />
  );

  MyResponsiveLine.propTypes = {
    data: PropTypes.array.isRequired,
  };

  return (
    <>
      <CCard className={styles.nivoLineCard}>
        <CCardHeader className={styles.nivoLineCardHeader}>
          <CRow>
            <div className={styles.chartLegend}>
              <span className={(styles.legendItem, styles.totalUsers)}>
                Total Users
              </span>
              <span className={styles.line}>|</span>
              <span className={styles.legendItem}>
                <FontAwesomeIcon
                  icon={faCircle}
                  className={styles.circleIconThis}
                />{" "}
                This Contest
              </span>
              <span className={styles.legendItem}>
                <FontAwesomeIcon
                  icon={faCircle}
                  className={styles.circleIconLast}
                />{" "}
                Last Contests
              </span>
            </div>
          </CRow>
        </CCardHeader>
        <CCardBody className={styles.cardBody}>
          {viewType === "Graph" ? (
            <MyResponsiveLine data={lineData} />
          ) : (
            <DataTableView tableData={lineData} />
          )}
        </CCardBody>
      </CCard>
    </>
  );
};

export default NivoLine;
