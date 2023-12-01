import { useEffect, useState } from "react";

import Chart from "chart.js/auto";
import "./orgChart.css";

const OrgChart = ({ viewsData }) => {
  const [chartInstance, setChartInstance] = useState(null);

  const lineColor = "rgb(75, 192, 192)";

  const chartData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6"],
    datasets: [
      {
        label: "Post Views",
        data: viewsData,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  useEffect(() => {
    const newChartInstance = new Chart(document.getElementById("org-chart"), {
      type: "line",
      data: chartData,
    });

    setChartInstance(newChartInstance);

    return () => {
      if (newChartInstance) {
        newChartInstance.destroy();
      }
    };
  }, [viewsData]);

  return (
    <div className="org-chart">
      <h3>Post Views Chart</h3>
      <canvas id="org-chart"></canvas>
    </div>
  );
};

export default OrgChart;
