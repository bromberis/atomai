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
  // console.log(year);
  function add(accumulator, a) {
    return accumulator + a;
  }

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
        order: 2,
      },
      {
        label: "Išlaidos",
        data: year.dataExp,
        fill: false,
        tension: 0.3,
        borderColor: "rgb(187, 137, 148)",
        order: 1,
      },
    ],
  };
  const options = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Line Chart",
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 15,
          },
        },
      },
      datalabels: {
        anchor: "start",
        align: "top",
        font: {
          weight: "bold",
          size: "13px",
        },
      },
    },
  };

  return (
    <div className="container">
      <div className="row">
        {((year.dataInc !== undefined && year.dataInc.reduce(add, 0) !== 0) ||
          (year.dataExp !== undefined &&
            year.dataExp.reduce(add, 0) !== 0)) && (
          <div className="col chart-card">
            <h4 className="text-center fs-2  mt-3">{year.year}</h4>
            <Line data={data} options={options} />
          </div>
        )}
      </div>
    </div>
  );
}

export default StatisticsMonthCard;
