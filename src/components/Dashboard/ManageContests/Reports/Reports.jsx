import React, { useState } from "react";
import { CrownOutlined, ClockCircleOutlined } from "@ant-design/icons";
import styles from "./Reports.module.css";
import Pagination from "../../../Pagination/Pagination";
import SortableHeader from "../Sorting/SortableHeader";

const crownColors = {
  1: "text-yellow-400",
  2: "text-gray-300",
  3: "text-orange-500",
};

const Reports = ({ data, setData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(8);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const sortData = (key, direction) => {
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
    setSortConfig({ key, direction });
  };

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = data.slice(indexOfFirstReport, indexOfLastReport);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-none px-4 sm:px-8">
      <div className="py-8">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className={styles.header}>
                  <SortableHeader
                    columnKey="rank"
                    onSort={sortData}
                    sortConfig={sortConfig}
                    className={styles.header}
                  >
                    Rank
                  </SortableHeader>
                </th>
                <th className={styles.header}>
                  <SortableHeader
                    columnKey="name"
                    onSort={sortData}
                    sortConfig={sortConfig}
                    className={styles.header}
                  >
                    Contestant Name
                  </SortableHeader>
                </th>
                <th className={styles.header}>
                  <SortableHeader
                    columnKey="correct"
                    onSort={sortData}
                    sortConfig={sortConfig}
                    className={styles.header}
                  >
                    Correct
                  </SortableHeader>
                </th>
                <th className={styles.header}>
                  <SortableHeader
                    columnKey="incorrect"
                    onSort={sortData}
                    sortConfig={sortConfig}
                    className={styles.header}
                  >
                    Incorrect
                  </SortableHeader>
                </th>
                <th className={styles.header}>
                  <SortableHeader
                    columnKey="attempts"
                    onSort={sortData}
                    sortConfig={sortConfig}
                    className={styles.header}
                  >
                    Attempts{" "}
                  </SortableHeader>
                </th>
                <th className={styles.header}>
                  <SortableHeader
                    columnKey="tabSwitches"
                    onSort={sortData}
                    sortConfig={sortConfig}
                    className={styles.header}
                  >
                    Tab Switch{" "}
                  </SortableHeader>
                </th>
                <th className={styles.header}>
                  <SortableHeader
                    columnKey="penalty"
                    onSort={sortData}
                    sortConfig={sortConfig}
                    className={styles.header}
                  >
                    Penalty{" "}
                  </SortableHeader>
                </th>
                <th className={styles.header}>
                  <SortableHeader
                    columnKey="score"
                    onSort={sortData}
                    sortConfig={sortConfig}
                    className={styles.header}
                  >
                    Score{" "}
                  </SortableHeader>
                </th>
                <th className={styles.header}>
                  <SortableHeader
                    columnKey="time"
                    onSort={sortData}
                    sortConfig={sortConfig}
                    className={styles.header}
                  >
                    Time{" "}
                  </SortableHeader>
                </th>
                {/* <th className={styles.header}>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {currentReports.map(([groupname, value], index) => (
                <tr
                  key={index}
                  className={
                    index < 3
                      ? styles[
                          `rank${
                            index + 1 + (currentPage - 1) * reportsPerPage
                          }`
                        ]
                      : styles.standardRow
                  }
                >
                  <td className={styles.rankCell}>
                    {index + 1 + (currentPage - 1) * reportsPerPage <= 3 && (
                      <CrownOutlined
                        className={
                          crownColors[
                            index + 1 + (currentPage - 1) * reportsPerPage
                          ]
                        }
                        style={{ fontSize: "25px", marginRight: "5px" }}
                      />
                    )}
                    {index + 1 + (currentPage - 1) * reportsPerPage}
                  </td>
                  <td className={styles.nameCell}>{groupname}</td>
                  <td className={styles.cell}>{value.solved}</td>
                  <td className={styles.cell}>{value.unsolved}</td>
                  <td className={styles.cell}>{value.total}</td>
                  <td className={styles.cell}>{value.tabswitch}</td>
                  <td className={styles.cell}>{value.penalty}</td>
                  <td className={styles.cell}>{value.point}</td>
                  <td className={styles.cell}>
                    <ClockCircleOutlined className="pr-1" />
                    {value.time}
                  </td>
                  {/* <td className={styles.cell}>
                    <button className={styles.analyticsButton}>
                      View Analytics
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(data.length / reportsPerPage)}
          onPageChange={paginate}
        />
      </div>
    </div>
  );
};

export default Reports;
