import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Reports from "./Reports";
import { useNavigate } from "react-router-dom";
import styleCss from "./ReportsPage.module.css";
import ReportPDF from "./ReportPDF";
import LangPieChart from "../Analytics/LangPieChart";
import SubmissionsReport from "../Analytics/SubmissionsReport";

const ReportsPage = ({ contestData }) => {
  const [data, setData] = useState([]);
  const [reloadLoading, setReloadLoading] = useState(false);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}contest/${contestData.id}?results=True`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const response_data = await response.json();
      if (!response.ok) {
        // 401 means unauthorized , 403 means unauthorized, so the user is either using an old token or is
        // either bypassing
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("accessToken");
          navigate("/");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setData(Object.entries(response_data));
      // Process the data
    } catch (error) {
      // Handle errors
      console.error(error);
    } finally {
      setReloadLoading(false);
      setRefreshLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      document.querySelector(".container").classList.add("loaded");
    }, 500); // 500 milliseconds delay

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styleCss.container}>
      <h1 className={styleCss.title}>Reports</h1>
      <div className={styleCss.exportButtonContainer}>
        <PDFDownloadLink
          document={<ReportPDF data={data} />}
          fileName="report.pdf"
        >
          {({ loading }) => (
            <button className={styleCss.exportButton} disabled={loading}>
              Export PDF
            </button>
          )}
        </PDFDownloadLink>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Reports contestData={contestData} data={data} setData={setData} />
        <LangPieChart />
        <SubmissionsReport />
      </div>
    </div>
  );
};

export default ReportsPage;