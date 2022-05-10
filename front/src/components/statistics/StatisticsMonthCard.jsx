import React, { useEffect } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

import "chart.js/auto";
import "./Statistics.css";

import { Line } from "react-chartjs-2";

function StatisticsMonthCard(year) {
  //   console.log(year.year);
  //   console.log(year.dataInc);

  // console.log(yearExp);
  console.log(year);

  const data = {
    labels: [
      "Sausis",
      "Vasaris",
      "Kovas",
      "Balandis",
      "Gegužė",
      "Birželis",
      "Liepa",
      "Rugpjūtis",
      "Rugsėjis",
      "Spalis",
      "Lapkritis",
      "Gruodis",
    ],
    datasets: [
      {
        label: "Pajamos",
        data: year.dataInc,
        fill: true,
        backgroundColor: "rgb(173,212,162, 0.6)",
        borderColor: "rgb(173,212,162)",
        tension: 0.3,
        maintainAspectRatio: false,
      },
      {
        label: "Second dataset",
        data: [333, 2500, 395, 501, 1154, 1176],
        fill: false,
        borderColor: "#742774",
      },
    ],
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col chart-card">
          <h4 className="text-center fs-2  mt-3">{year.year}</h4>
          <Line data={data} />
        </div>
      </div>
    </div>
  );
}

export default StatisticsMonthCard;
