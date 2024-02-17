import React, { useState } from "react";
import PropTypes from "prop-types";
import { ResponsivePie } from "@nivo/pie";
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import DataTableView from "./DataTable";
import styles from "./LangPieChart.module.css";

const LangPieChart = () => {
  const [viewType, setViewType] = useState("Graph");
  const [pieOrDonut, setPieOrDonut] = useState("Pie");

  const pieData = [
    { id: "python", label: "Python", value: 20, color: "hsl(120, 70%, 50%)" },
    { id: "rust", label: "Rust", value: 15, color: "hsl(240, 70%, 50%)" },
    { id: "java", label: "Java", value: 18, color: "hsl(60, 70%, 50%)" },
    { id: "c++", label: "C++", value: 12, color: "hsl(180, 70%, 50%)" },
    { id: "c#", label: "C#", value: 10, color: "hsl(300, 70%, 50%)" },
    {
      id: "javascript",
      label: "JavaScript",
      value: 25,
      color: "hsl(30, 70%, 50%)",
    },
    {
      id: "typescript",
      label: "TypeScript",
      value: 22,
      color: "hsl(210, 70%, 50%)",
    },
    { id: "php", label: "PHP", value: 8, color: "hsl(90, 70%, 50%)" },
  ];

  const dataTableData = [
    { label: "Python", UsagePercentage: 20, color: "#ff7f0e" },
    { label: "Rust", UsagePercentage: 15, color: "#2ca02c" },
    { label: "Java", UsagePercentage: 18, color: "#1f77b4" },
    { label: "C++", UsagePercentage: 12, color: "#d62728" },
    { label: "C#", UsagePercentage: 10, color: "#9467bd" },
    { label: "JavaScript", UsagePercentage: 25, color: "#1f77b4" },
    { label: "TypeScript", UsagePercentage: 22, color: "#393b79" },
    { label: "PHP", UsagePercentage: 8, color: "#ffbb78" },
  ];

  const MyResponsivePie = ({ data, pieType }) => (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={pieType === "pie" ? 0 : 0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={5}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "python",
          },
          id: "dots",
        },
        {
          match: {
            id: "rust",
          },
          id: "dots",
        },
        {
          match: {
            id: "java",
          },
          id: "dots",
        },
        {
          match: {
            id: "c++",
          },
          id: "dots",
        },
        {
          match: {
            id: "c#",
          },
          id: "dots",
        },
        {
          match: {
            id: "javascript",
          },
          id: "dots",
        },
        {
          match: {
            id: "typescript",
          },
          id: "lines",
        },
        {
          match: {
            id: "php",
          },
          id: "lines",
        },
      ]}
      legends={[
        {
          anchor: "right",
          direction: "column",
          justify: false,
          translateX: 0,
          translateY: 150,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 26,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );

  MyResponsivePie.propTypes = {
    data: PropTypes.object.isRequired,
    pieType: PropTypes.bool.isRequired,
  };

  const handleViewTypeClick = (value) => {
    setViewType(value);
    if (value === "Data") {
      setPieOrDonut(""); // Hide Pie and Donut when Data button is clicked
    }
  };

  return (
    <>
      <CCard className={styles.card}>
        <CCardHeader className={styles.header}>
          <CRow>
            <CCol sm={6}>
              <h4 className={styles.title}>Languages Usage Percentage</h4>
            </CCol>
            <CCol sm={3}>
              <CButtonGroup className={styles.buttonGroup}>
                {["Graph", "Data"].map((value) => (
                  <CButton
                    color={viewType === value ? "purple" : "lightGray"}
                    onClick={() => handleViewTypeClick(value)}
                    key={value}
                    className={styles.button}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
            <CCol sm={3}>
              <CButtonGroup className={styles.buttonGroup}>
                {["Pie", "Donut"].map((value) => (
                  <CButton
                    color={pieOrDonut === value ? "purple" : "lightGray"}
                    active={value === pieOrDonut}
                    onClick={() => setPieOrDonut(value)}
                    key={value}
                    className={styles.button}
                    style={{
                      display: viewType === "Data" ? "none" : "inline-block",
                    }}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody className={styles.chartWrapper}>
          {viewType === "Graph" ? (
            <MyResponsivePie
              data={pieData}
              pieType={pieOrDonut.toLowerCase()}
            />
          ) : (
            <DataTableView tableData={dataTableData} />
          )}
        </CCardBody>
      </CCard>
    </>
  );
};
export default LangPieChart;
