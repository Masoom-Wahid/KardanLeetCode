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

const LangPieChart = ({data}) => {
  console.log(data)
  const [viewType, setViewType] = useState("Graph");
  const [pieOrDonut, setPieOrDonut] = useState("Pie");

  const pieData = [
    { id: "python", label: "Python", value: data.python, color: "hsl(120, 70%, 50%)" },
    { id: "rust", label: "Rust", value: data.rust, color: "hsl(240, 70%, 50%)" },
    { id: "java", label: "Java", value: data.java, color: "hsl(60, 70%, 50%)" },
    { id: "c", label: "C", value: data.c, color: "hsl(300, 70%, 50%)" },
    { id: "c++", label: "C++", value: data.cpp, color: "hsl(180, 70%, 50%)" },
    { id: "c#", label: "C#", value: data.csharp, color: "hsl(300, 70%, 50%)" },
    {
      id: "javascript",
      label: "JavaScript",
      value: data.js,
      color: "hsl(30, 70%, 50%)",
    },
    {
      id: "typescript",
      label: "TypeScript",
      value: data.ts,
      color: "hsl(210, 70%, 50%)",
    },
    { id: "php", label: "PHP", value: data.php, color: "hsl(90, 70%, 50%)" },
  ];

  const dataTableData = [
    { label: "Python", UsagePercentage: data.python, color: "#ff7f0e" },
    { label: "Rust", UsagePercentage: data.rust, color: "#2ca02c" },
    { label: "Java", UsagePercentage: data.java, color: "#1f77b4" },
    { label: "C++", UsagePercentage: data.cpp, color: "#d62728" },
    { label: "C", UsagePercentage: data.c, color: "#d62728" },
    { label: "C#", UsagePercentage: data.csharp, color: "#9467bd" },
    { label: "JavaScript", UsagePercentage: data.js, color: "#1f77b4" },
    { label: "TypeScript", UsagePercentage: data.ts, color: "#393b79" },
    { label: "PHP", UsagePercentage: data.php, color: "#ffbb78" },
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
