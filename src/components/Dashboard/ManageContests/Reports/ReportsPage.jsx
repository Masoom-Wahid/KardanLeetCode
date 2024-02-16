import React, { useRef } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";

import styles from "./ReportsPage.module.css";
import Reports from "./Reports";
import ReportPDF from "./ReportPDF";

const ReportsPage = () => {
  const handleExportPDF = () => {
    const pdfBlob = new Blob([<ReportPDF />], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Open the PDF in a new tab
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Reports</h1>

      <PDFDownloadLink document={<ReportPDF />} fileName="report.pdf">
        {({ blob, url, loading, error }) =>
          loading ? (
            "Loading document..."
          ) : (
            <button className={styles.exportButton} onClick={handleExportPDF}>
              Export PDF
            </button>
          )
        }
      </PDFDownloadLink>
      <Reports />
    </div>
  );
};

export default ReportsPage;
