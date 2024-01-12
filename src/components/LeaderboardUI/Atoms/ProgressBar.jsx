// /atoms/ProgressBar/ProgressBar.jsx
import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const ProgressBar = ({ value, maxValue }) => {
  const data = {
    datasets: [
      {
        data: [value, maxValue - value],
        backgroundColor: ["#4caf50", "#e0e0e0"],
        borderColor: ["#4caf50", "#e0e0e0"],
        borderWidth: 1,
        cutout: "90%",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    rotation: 270,
    circumference: 180,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default ProgressBar;
