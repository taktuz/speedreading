import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./Chart.css";

export default function CustomChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        datasets: [
          {
            label: "Reading Speed (WPM)",
            data: [200, 250, 300, 280, 320, 310, 330],
            backgroundColor: "#666", // Accent gray
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => chartInstance.destroy();
  }, []);

  return (
    <div className="chart-container">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
