import React, { useState, useEffect } from "react";
import { getAllUsersData, createUserIncome } from "../api/library/UsersAPI";
import { useForm } from "react-hook-form";

function IncomeExpensesInput() {
  const [display, setDisplay] = useState("income");
  let [user, setUser] = useState({});
  let [income, setIncome] = useState({});
  let [expense, setExpense] = useState({});

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

  function submitNewIncomeExpense(e) {
    e.preventDefault();
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

    // display == "income" ? user.income.push(income) : user.expenses.push(expense);

    console.log(user);

    // updateUser(user, user._id);
    createUserIncome(user._id, income);
  }
  //   function sumValidate(e) {
  //     // replace comma with dot
  //     function replaceComma(e) {
  //       if (!e.target.value.includes(`.`)) {
  //         let newString = document.forms[0].elements[0].value + `.`;
  //         document.forms[0].elements[0].value = newString;
  //       }
  //     }

  //     // numbers only
  //     let charCode = e.which ? e.which : e.keyCode;
  //     console.log(!/\.\d{1,2}/.test(e.target.value));

  //     if (charCode == 44) {
  //       replaceComma(e);
  //     }
  //     if (/\.\d{2}$/.test(e.target.value)) {
  //       e.preventDefault();
  //     }
  //     if (charCode == 46 && !e.target.value.includes(`.`)) {
  //     } else if (charCode > 31 && (charCode < 48 || charCode > 57)) {
  //       e.preventDefault();
  //     }
  //   }

  function buttonColor(btnColor) {
    return btnColor == display ? "btn-dark" : "btn-secondary";
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col">Labas, {user.name}</div>

          <div className="col mb-3 ">
            <button
              onClick={() => setDisplay("income")}
              className={`btn rounded-0  ${buttonColor("income")}`}
            >
              Pajamos
            </button>

            <button
              onClick={(e) => setDisplay("expenses")}
              className={`btn rounded-0 ${buttonColor("expenses")}`}
            >
              Išlaidos
            </button>
          </div>
          <div className="row">
            <div className="col">
              <form
                className=""
                onChange={(e) => {
                  display == "income"
                    ? updateIncomeObject(e)
                    : updateExpenseObject(e);
                }}
                onSubmit={(e) => {
                  submitNewIncomeExpense(e);
                }}
              >
                <div className="row">
                  <div className="col">
                    {/* SUMA */}

                    <input
                      className="form-control "
                      placeholder="Suma"
                      type="number"
                      name="sum"
                      id="sum"
                      step="0.01"
                      // defaultValue={sum}
                      {...register("sum", {
                        required: true,
                        pattern:
                          /^((?!0)\d{1,10}|0|\.\d{1,2})($|\.$|\.\d{1,2}$)/,
                        // min: 1,
                        maxLength: 10,
                      })}
                    />
                    {errors.sum && (
                      <span className="text-danger fw-light">
                        Būtinas laukas. Ne daugiau 10 simbolių, negali būti
                        neigimas skaičius.
                      </span>
                    )}
                  </div>

                  <div className="col">
                    <div className="">
                      {/* DATA */}
                      <input
                        className="form-control"
                        type="date"
                        name="date"
                        id="date-inp"
                        defaultValue={new Date().toISOString().substr(0, 10)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="">
                      {/* KATEGORIJA */}
                      <select
                        className="form-select"
                        name="category"
                        id="category"
                      >
                        {/* <option value="none">Kategorija 🔽</option> */}
                        <option value="alga">Alga</option>
                        <option value="prize">Prizas</option>
                        <option value="etc">Kita</option>
                      </select>
                    </div>
                  </div>
                  <div className="col">
                    <div className="">
                      {/* PAVADINIMAS */}
                      <input
                        className="form-control mb-4"
                        placeholder="Pavadinimas"
                        type="text"
                        name="name"
                        id="name"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    {/* BALANSAS */}
                    <h4>Balansas: {user.balance}</h4>
                  </div>
                </div>

                <div className="row">
                  <div className="col text-center">
                    {/* SUBMIT BUTTON */}
                    <button className="btn btn-success mt-3 w-25" type="submit">
                      {display == "income"
                        ? `Prideti pajamas`
                        : `Prideti išlaidas`}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IncomeExpensesInput;
