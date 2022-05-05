import React, { useEffect } from "react";

import { useGlobalContext } from "../context/IncomeContext";
import { useGlobalExpensesContext } from "../context/ExpensesContext";
import "./Statistics.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

function Statistics() {
  const { income, getUserID } = useGlobalContext();
  const { expenses, getExpUserID } = useGlobalExpensesContext();

  console.log(income);
  console.log(expenses);
  useEffect(() => {
    getUserID();
    getExpUserID();
  }, []);

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 3,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
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
        align: "right",
        font: {
          weight: "bold",
          size: "20px",
        },
      },
    },
    scales: {
      x: {
        grid: {
          offset: true,
        },
      },
      yAxes: {
        ticks: {
          reverse: false,
          stepSize: 3,
        },
      },
    },
  };

  const labels = [""];

  const data = {
    labels,
    datasets: [
      {
        label: "Pajamos",
        data: [income],
        borderColor: "rgb(173,212,162)",
        backgroundColor: "rgb(173,212,162, 0.8)",
      },
      {
        label: "Išlaidos",
        data: [expenses],
        borderColor: "rgb(187, 137, 148)",
        backgroundColor: "rgb(187, 137, 148, 0.8)",
      },
    ],
  };

  return (
    <>
      <div className="container pt-3">
        <div className="row">
          <div className="col ">
            <h3 className="text-center  custom-title">
              Einamojo mėnesio statistika
            </h3>
            <div className="horizontal-bar mx-auto">
              <Bar options={options} data={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Statistics;
