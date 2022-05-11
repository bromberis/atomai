import React, { useState, useEffect } from "react";
import {
  getAllUsersData,
  createUserIncome,
  createUserExpense,
  getUserById,
} from "../../api/library/UsersAPI";
import { useForm } from "react-hook-form";
import "./IncomeExpensesInput.css";
import { useGlobalUserContext, UserContext } from "../context/UserContext";
import { useGlobalContext } from "../context/IncomeContext";
import { useGlobalExpensesContext } from "../context/ExpensesContext";
import { Link } from "react-router-dom";
import LastThree from "./LastThree";

function IncomeExpensesInput() {
  const [display, setDisplay] = useState("income");
  let [user, setUser] = useState({});
  let [income, setIncome] = useState({ category: "Alga", name: "" });
  let [expense, setExpense] = useState({ category: "Kita", name: "" });

  const { incomeThisMonth, getUserID } = useGlobalContext();
  const { expensesThisMonth, getExpUserID } = useGlobalExpensesContext();

  const { userData, setUserData, updateUserData } =
    useGlobalUserContext(UserContext);

  useEffect(() => {
    setUser(userData);
    console.log(userData);
    console.log(user);
  });
  // todays date ISO format
  // console.log(new Date().toISOString().substr(0, 10));

  function updateIncomeObject(e) {
    e.preventDefault();
    income[e.target.name] = e.target.value;
  }
  function updateExpenseObject(e) {
    e.preventDefault();
    expense[e.target.name] = e.target.value;
  }

  function submitNewIncomeExpense() {
    console.log(userData);
    console.log(user);
    // e.preventDefault();
    // If no date selected puts current date into income object
    // cant use ! in front of "date"?
    if ("date" in income) {
      console.log(income);
    } else {
      income.date = new Date().toISOString().substr(0, 10);
    }
    if ("date" in expense) {
      console.log(expense);
    } else {
      expense.date = new Date().toISOString().substr(0, 10);
    }

    display == "income"
      ? createUserIncome(user._id, income).then(() => {
          updateUserData(user._id);
        })
      : createUserExpense(user._id, expense).then(() => {
          updateUserData(user._id);
        });

    getUserID();
    getExpUserID();
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit() {
    submitNewIncomeExpense();
    reset();
  }

  return (
    <>
      <div className="container mt-3  p-5 ">
        <div className="row">
          <div className="col-lg-7 col-md-7 col-sm-12 p-0 hello-msg text-lg-start text-md-start text-center pb-md-0 pb-4">
            Labas, {user.name} !
          </div>

          <div className="col-lg-5 col-md-5 col-sm-12 text-end p-0">
            <button
              onClick={() => {
                setDisplay("income");
                reset();
              }}
              className={`btn-all   btn-income`}
            >
              Pajamos
            </button>

            <button
              onClick={(e) => {
                setDisplay("expenses");
                reset();
              }}
              className={`btn-all btn-expenses`}
            >
              Išlaidos
            </button>
          </div>

          <form
            className="border-main"
            onChange={(e) => {
              display === "income"
                ? updateIncomeObject(e)
                : updateExpenseObject(e);
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row">
              <div className="col-lg-6 col-md-6  p-2">
                {/* SUMA */}

                <input
                  className="rounded-0 input-custom "
                  placeholder="Suma"
                  type="number"
                  name="sum"
                  id="sum"
                  step="0.01"
                  // defaultValue={sum}
                  {...register("sum", {
                    required: true,
                    pattern: /^(\d){0,8}(\.){0,1}(\d){0,2}$/,
                    // min: 1,
                    maxLength: 10,
                  })}
                />
                {errors.sum && (
                  <span className="text-danger fw-light">
                    Būtinas laukas. Ne daugiau 10 simbolių, negali būti
                    neigiamas skaičius.
                  </span>
                )}
              </div>

              <div className="col-lg-6 col-md-6 p-2">
                {/* DATA */}

                <input
                  className="rounded-0 input-custom"
                  type="date"
                  name="date"
                  id="date-inp"
                  min="2010-01-01"
                  max="2099-01-01"
                  defaultValue={new Date().toISOString().substr(0, 10)}
                />
              </div>
            </div>

            <div className="row bottom-space">
              <div className="col-lg-6 col-md-6 p-2">
                {/* KATEGORIJA */}
                {display === "income" ? (
                  <select
                    className=" input-custom rounded-0"
                    name="category"
                    id="category"
                    // value="Alga"
                    {...register("category", { required: true })}
                  >
                    <option value="Alga">Alga</option>
                    <option value="Premija">Premija</option>
                    <option value="Dovana">Dovana</option>
                    <option value="Loterija">Loterija</option>
                    <option value="Išmoka">Išmoka</option>
                    <option value="Kita">Kita</option>
                  </select>
                ) : (
                  <select
                    className="input-custom rounded-0"
                    name="category"
                    id="category"
                    // value="Alga"
                    {...register("category", { required: true })}
                  >
                    <option value="Kita">Kita</option>
                    <option value="Maistas">Maistas</option>

                    <option value="Pramogos">Pramogos</option>
                    <option value="Mokesčiai">Mokesčiai</option>
                    <option value="Rūbai">Rūbai</option>
                    <option value="Transportas">Transportas</option>
                  </select>
                )}
              </div>

              <div className="col-lg-6 col-md-6 p-2 ">
                {/* PAVADINIMAS */}
                <input
                  className="rounded-0 input-custom "
                  placeholder="Pastabos"
                  type="text"
                  name="name"
                  id="name"
                  {...register("name", {
                    // pattern: /^[[^A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ0-9_ .+-]*$/i,
                    maxLength: 30,
                  })}
                />
                {errors.name && (
                  <span className="text-danger fw-light">
                    Daugiausiai 30 simbolių.
                  </span>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-12 text-center">
                {/* SUBMIT BUTTON */}
                {display === "income" ? (
                  <button
                    className=" col-5 col-lg-4 btn-submit-input btn-all"
                    type="submit"
                  >
                    Pridėti pajamas
                  </button>
                ) : (
                  <button
                    className=" col-5 col-lg-4 btn-submit-expenses btn-all"
                    type="submit"
                  >
                    Pridėti išlaidas
                  </button>
                )}
              </div>
            </div>
            <div className="row text-center bottom-space">
              <Link to="/statistics">
                <button type="button" className="col-5 col-lg-4   balance ">
                  Šio mėnesio balansas:{" "}
                  <span className="fw-bold">
                    {(incomeThisMonth - expensesThisMonth).toFixed(2)}
                  </span>
                </button>
              </Link>
            </div>
          </form>
        </div>
        <div className="row">
          <LastThree />
        </div>
      </div>
    </>
  );
}

export default IncomeExpensesInput;
