"use client";

import { Doughnut } from "react-chartjs-2";
import { ArcElement } from "chart.js";
import { Chart as ChartJS, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Pipe() {
  const dataa = {
    labels: ["otros", "comida", "ropa"],
    datasets: [
      {
        label: "Expenses",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        borderColor: "black",
        hoverOffset: 4,
      },
    ],
  };
  return <Doughnut data={dataa} />;
}
