import React, { useEffect } from "react";

import { useGlobalContext } from "../context/IncomeContext";
import { useGlobalExpensesContext } from "../context/ExpensesContext";
import { v4 as uuidv4 } from "uuid";
import StatisticsMonthCard from "./StatisticsMonthCard.jsx";
import "./Statistics.css";
import _ from "lodash";

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
  const { incomeThisMonth, getUserID, incomeByMonthData } = useGlobalContext();
  const { expensesThisMonth, getExpUserID, expensesByMonthData } =
    useGlobalExpensesContext();

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
        data: [incomeThisMonth],
        borderColor: "rgb(173,212,162)",
        backgroundColor: "rgb(173,212,162, 0.8)",
      },
      {
        label: "Išlaidos",
        data: [expensesThisMonth],
        borderColor: "rgb(187, 137, 148)",
        backgroundColor: "rgb(187, 137, 148, 0.8)",
      },
    ],
  };

  console.log(incomeByMonthData);
  console.log(expensesByMonthData);

  // const mergedIncExp = incomeByMonthData.map((obj) =>
  //   Object.assign(
  //     obj,
  //     expensesByMonthData.find((exp) => obj.year === exp.year)
  //   )
  // );
  //1
  // let mergedIncExp = incomeByMonthData.map((item, i) =>
  //   Object.assign({}, item, expensesByMonthData[i])
  // );

  //2
  // const map = new Map();
  // incomeByMonthData.forEach((item) => map.set(item.year, item));
  // expensesByMonthData.forEach((item) => map.set(item.year, item));
  // const mergedIncExp = Array.from(map.values());

  var merged = _.merge(
    _.keyBy(incomeByMonthData, "yearInc"),
    _.keyBy(expensesByMonthData, "yearExp")
  );
  var mergedIncExp = _.values(merged);

  console.log(mergedIncExp);

  let mergedData = mergedIncExp
    .sort()
    .reverse()
    .map((item) => {
      return (
        <StatisticsMonthCard
          key={uuidv4()}
          year={item.yearInc}
          dataInc={item.dataInc}
          dataExp={item.dataExp}
        />
      );
    });

  return (
    <>
      <div className="container pt-3">
        <div className="row">
          <div className="col ">
            <h2 className="text-center  custom-title mb-3 ">Einamasis mėnuo</h2>
            <p className="text-center fs-4 ">
              Balansas:{" "}
              <span className="fw-bold">
                {(incomeThisMonth - expensesThisMonth).toFixed(2)}
              </span>
            </p>
            <div className="horizontal-bar mx-auto">
              <Bar options={options} data={data} />
            </div>
            <h3 className="text-center  custom-title mt-5">
              Praėjusių mėnesių suvestinės
            </h3>
            <div>{mergedData}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Statistics;
