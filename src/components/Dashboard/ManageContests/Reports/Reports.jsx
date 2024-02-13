import React, { useState } from "react";
import { CrownOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./Reports.module.css";
import Pagination from "../../../Pagination/Pagination";
import SortableHeader from "../Sorting/SortableHeader";

const crownColors = {
  1: "text-yellow-400",
  2: "text-gray-300",
  3: "text-orange-500",
};

const Reports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const [data, setData] = useState([
    {
      rank: 1,
      name: "Alpha",
      solutions: 9,
      attempts: 9,
      tabSwitches: 0,
      score: 90,
      time: "10.15AM",
    },
    {
      rank: 2,
      name: "Beta",
      solutions: 9,
      attempts: 10,
      tabSwitches: 12,
      score: 85,
      time: "11.20AM",
    },
    {
      rank: 3,
      name: "Omega",
      solutions: 5,
      attempts: 9,
      tabSwitches: 23,
      score: 50,
      time: "11.45AM",
    },
    {
      rank: 4,
      name: "Gamma",
      solutions: 2,
      attempts: 5,
      tabSwitches: 10,
      score: 20,
      time: "12.15PM",
    },
    {
      rank: 5,
      name: "Epsilon",
      solutions: 1,
      attempts: 2,
      tabSwitches: 10,
      score: 10,
      time: "12.15PM",
    },
    {
      rank: 6,
      name: "Epsilon",
      solutions: 1,
      attempts: 2,
      tabSwitches: 10,
      score: 10,
      time: "12.15PM",
    },
    {
      rank: 7,
      name: "Alpha",
      solutions: 9,
      attempts: 9,
      tabSwitches: 0,
      score: 90,
      time: "10.15AM",
    },
    {
      rank: 8,
      name: "Beta",
      solutions: 9,
      attempts: 10,
      tabSwitches: 12,
      score: 85,
      time: "11.20AM",
    },
    {
      rank: 9,
      name: "Omega",
      solutions: 5,
      attempts: 9,
      tabSwitches: 23,
      score: 50,
      time: "11.45AM",
    },
  ]);

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
    <div className="container mx-auto px-4 sm:px-8">
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
                    columnKey="solutions"
                    onSort={sortData}
                    sortConfig={sortConfig}
                    className={styles.header}
                  >
                    Successful Solutions
                  </SortableHeader>
                </th>
                <th className={styles.header}>
                  Attempt{" "}
                  <FontAwesomeIcon
                    className={styles.sortIcon}
                    icon={faCaretDown}
                  />
                </th>
                <th className={styles.header}>
                  Tab Switch{" "}
                  <FontAwesomeIcon
                    className={styles.sortIcon}
                    icon={faCaretUp}
                  />
                </th>
                <th className={styles.header}>
                  Score{" "}
                  <FontAwesomeIcon
                    className={styles.sortIcon}
                    icon={faCaretDown}
                  />
                </th>
                <th className={styles.header}>
                  Time{" "}
                  <FontAwesomeIcon
                    className={styles.sortIcon}
                    icon={faCaretUp}
                  />
                </th>
                <th className={styles.header}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentReports.map((item, index) => (
                <tr
                  key={index}
                  className={
                    index < 3 ? styles[`rank${item.rank}`] : styles.standardRow
                  }
                >
                  <td className={styles.rankCell}>
                    {item.rank <= 3 && (
                      <CrownOutlined
                        className={crownColors[item.rank]}
                        style={{ fontSize: "25px", marginRight: "5px" }}
                      />
                    )}
                    {item.rank}
                  </td>
                  <td className={styles.nameCell}>{item.name}</td>
                  <td className={styles.cell}>{item.solutions}</td>
                  <td className={styles.cell}>{item.attempts}</td>
                  <td className={styles.cell}>{item.tabSwitches}</td>
                  <td className={styles.cell}>{item.score}</td>
                  <td className={styles.cell}>
                    <ClockCircleOutlined className="pr-1" />
                    {item.time}
                  </td>
                  <td className={styles.cell}>
                    <button className={styles.analyticsButton}>
                      View Analytics
                    </button>
                  </td>
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
