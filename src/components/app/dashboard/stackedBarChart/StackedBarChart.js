// StackedBarChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StackedBarChart = ({ allData }) => {
  console.log(allData);
  const data = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Dataset 1",
        data: [12, 19, 3, 5, 2],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: [2, 3, 20, 5, 1],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "Dataset 3",
        data: [3, 10, 13, 15, 22],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Appoinments By Service type",
        font: {
          size: 18, // Font size for the title
        },
      },
      datalabels: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      legend: {
        position: "top",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return <Bar data={allData?.data ? allData?.data : data} options={options} />;
};

export default StackedBarChart;
