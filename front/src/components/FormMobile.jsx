import React, { useState } from "react";
import { getAllUsersData, createUserIncome } from "../api/library/UsersAPI";

export default function IncomeMobile({ user }) {
  let [income, setIncome] = useState({});
  let [expense, setExpense] = useState({});

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
    console.log(`!!!!!!!!${(income, user._id)}`);
    createUserIncome(income, user._id);
  }
  function sumValidate(e) {
    // replace comma with dot
    function replaceComma(e) {
      if (!e.target.value.includes(`.`)) {
        let newString = document.forms[0].elements[0].value + `.`;
        document.forms[0].elements[0].value = newString;
      }
    }

    // numbers only
    let charCode = e.which ? e.which : e.keyCode;
    console.log(!/\.\d{1,2}/.test(e.target.value));

    if (charCode == 44) {
      replaceComma(e);
    }
    if (/\.\d{2}$/.test(e.target.value)) {
      e.preventDefault();
    }
    if (charCode == 46 && !e.target.value.includes(`.`)) {
    } else if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      e.preventDefault();
    }
  }
  return (
    <div>
      <div>income</div>
      <div>
        <form onKeyPress={(e) => sumValidate(e)} onSubmit={(e) => submitNewIncomeExpense(e)}>
          <div className="form-group">
            <input type="text" className="form-control" id="sum" name="sum" placeholder="Suma" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" id="date" name="date" defaultValue={new Date().toISOString().substr(0, 10)} />
          </div>
          <div className="form-group">
            <select className="form-control" name="category" id="category">
              <option value="none">Kategorija 🔽</option>
              <option value="wage">Alga</option>
              <option value="prize">Prizas</option>
              <option value="etc">Kita</option>
            </select>
          </div>
          <div className="form-group">
            <input type="text" className="form-control" name="name" id="name" placeholder="Pavadinimas" />
          </div>
          <div>
            <button className="btn btn-success">Prideti</button>
          </div>
        </form>
      </div>
    </div>
  );
}
