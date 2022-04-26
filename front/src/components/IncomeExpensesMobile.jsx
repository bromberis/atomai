import React, { useState, useEffect } from "react";
import FormMobile from "./FormMobile";
import { getAllUsersData, createUserIncome } from "../api/library/UsersAPI";

export default function IncomeExpensesMobile() {
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

  function buttonColor(btnColor) {
    return btnColor == display ? "btn-dark" : "btn-secondary";
  }
  return (
    <div>
      <div>
        <button onClick={() => setDisplay("income")} className={`btn ${buttonColor("income")}`}>
          Pajamos
        </button>
      </div>

      {display == "income" && <FormMobile user={user} />}
      <div>
        <button onClick={() => setDisplay("expenses")} className={`btn ${buttonColor("expenses")}`}>
          Išlaidos
        </button>
      </div>

      {display == "expenses" && <FormMobile user={user} />}
      <div>Balansas: {}</div>
    </div>
  );
}
