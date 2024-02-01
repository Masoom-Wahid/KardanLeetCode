import React from "react";
import PropTypes from "prop-types";
import styles from "./DataTable.module.css"; // Import the CSS module

const {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} = require("@coreui/react");

function DataTableView({ tableData }) {
  const columns = Object.keys(tableData[0]);

  const tableHeaderData = () => {
    return columns.map((data) => {
      return (
        <CTableHeaderCell
          scope="col"
          key={data}
          className={styles.tableHeaderCell}
        >
          {data.toUpperCase()}
        </CTableHeaderCell>
      );
    });
  };

  const tableBodyData = () => {
    return tableData.map((rowData, index) => {
      return (
        <CTableRow key={index} className={styles.tableRow}>
          {columns.map((colId) => {
            return (
              <CTableDataCell
                scope="col"
                key={`${index}_${colId}`}
                className={styles.tableDataCell}
              >
                {rowData[colId]}
              </CTableDataCell>
            );
          })}
        </CTableRow>
      );
    });
  };

  DataTableView.propTypes = {
    tableData: PropTypes.array.isRequired,
  };

  return (
    <CTable bordered striped className={styles.table}>
      <CTableHead className={styles.tableHead}>
        <CTableRow>{tableHeaderData()}</CTableRow>
      </CTableHead>
      <CTableBody>{tableBodyData()}</CTableBody>
    </CTable>
  );
}
export default DataTableView;
