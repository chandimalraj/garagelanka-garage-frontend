import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const DoughnutChart = ({ allData }) => {
  // Data for the Doughnut Chart
  console.log(allData);
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true, // Show the title
        text: "Appoinments In Given Date Range", // Title text
        font: {
          size: 18, // Font size for the title
        },
      },
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
      datalabels: {
        display: true,
        formatter: (value, context) => {
          const total = context.dataset.data.reduce((acc, cur) => acc + cur, 0);
          console.log(total)
          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%`;
        },
        color: '#0D0D0D',
        font: {
          size: 14,
        }
      }
    },
  };

  return (
    <Doughnut
      data={allData?.labels?.length > 0 ? allData : data}
      options={options}
    />
  );
};

export default DoughnutChart;
