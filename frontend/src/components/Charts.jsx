import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Charts({ stats }) {
  const labels = Object.keys(stats);
  const data = {
    labels,
    datasets: [
      {
        label: "Score moyen",
        data: labels.map(
          p =>
            stats[p].reduce((a, b) => a + b, 0) / (stats[p].length || 1)
        ),
        backgroundColor: "rgba(99, 102, 241, 0.7)"
      }
    ]
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <Bar data={data} />
    </div>
  );
}