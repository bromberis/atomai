import React, { useState, useEffect } from "react";
import { getAllUsersData, createUserIncome, createUserExpense } from "../api/library/UsersAPI";
import { useForm } from "react-hook-form";
import "./IncomeExpensesInput.css";

function IncomeExpensesInput() {
  const [display, setDisplay] = useState("income");
  let [user, setUser] = useState({});
  let [income, setIncome] = useState({ category: "Alga" });
  let [expense, setExpense] = useState({ category: "Kita" });

  const getUser = () => {
    getAllUsersData().then((res) => {
      setUser(res.data.data.users[0]);
      console.log(res.data.data.users[0]);
    });
  };
  useEffect(() => getUser(), []);
  // todays date ISO format
  console.log(new Date().toISOString().substr(0, 10));

  function updateIncomeObject(e) {
    e.preventDefault();
    income[e.target.name] = e.target.value;
    console.log(income);
  }
  function updateExpenseObject(e) {
    e.preventDefault();
    expense[e.target.name] = e.target.value;
    console.log(expense);
  }

  function submitNewIncomeExpense() {
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

    display == "income" ? createUserIncome(user._id, income) : createUserExpense(user._id, expense);
  }

  function buttonColor(btnColor) {
    return btnColor == display ? " btn-income" : " btn-expenses";
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit() {
    submitNewIncomeExpense();
  }

  return (
    <>
      <div className="container mt-3 ">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-12 p-0 hello-msg text-lg-start text-md-start text-center">Labas, {user.name} !</div>

          <div className="col-lg-9 col-md-9 col-sm-12 text-end p-0">
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
          {/* <div className="row">
            <div className="col"> */}
          <form
            className="border-main"
            onChange={(e) => {
              display == "income" ? updateIncomeObject(e) : updateExpenseObject(e);
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
                {errors.sum && <span className="text-danger fw-light">Būtinas laukas. Ne daugiau 10 simbolių, negali būti neigiamas skaičius.</span>}
              </div>

              <div className="col-lg-6 col-md-6 p-2">
                {/* DATA */}
                <input className="rounded-0 input-custom" type="date" name="date" id="date-inp" min="2010-01-01" max="2099-01-01" defaultValue={new Date().toISOString().substr(0, 10)} />
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
                    <option value="Maistas">Pramogos</option>
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
                    maxLength: 40,
                  })}
                />
                {errors.name && <span className="text-danger fw-light">Daugiausiai 40 simbolių.</span>}
              </div>
            </div>
            {/* <div className="row">
              <div className="col">
                
                <h4>Balansas: {user.balance}</h4>
              </div>
            </div> */}

            <div className="row">
              <div className="col-12 text-center">
                {/* SUBMIT BUTTON */}
                {display == "income" ? (
                  <button className="btn-submit-input btn-all" type="submit">
                    Pridėti pajamas
                  </button>
                ) : (
                  <button className="btn-submit-expenses btn-all" type="submit">
                    Pridėti išlaidas
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* </div>
      </div> */}
    </>
  );
}

export default IncomeExpensesInput;
