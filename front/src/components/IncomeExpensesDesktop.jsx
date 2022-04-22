import React, { useState, useEffect } from "react";

export default function IncomeExpenses() {
  const [display, setDisplay] = useState("income");
  let [user, setUser] = useState({});
  let [income, setIncome] = useState({});
  let [expense, setExpense] = useState({});

  const getUser = () => {
    fetch(`http://localhost:3005/api/v1/users`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data.users[0]);
        setUser(result.data.users[0]);
        user = result.data.users[0];
        console.log(user);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => getUser(), []);
  // todays date ISO format
  console.log(new Date().toISOString().substr(0, 10));

  function updateIncomeObject(e) {
    e.preventDefault();
    income[e.target.name] = e.target.value;
    console.log(income);
  }

  function submitNewIncome(e) {
    // If no date selected puts current date into income object
    // cant use ! in front of "date"?
    if ("date" in income) {
      console.log(income);
    } else {
      income.date = new Date().toISOString().substr(0, 10);
    }

    e.preventDefault();
    user.income.push(income);
    console.log(user);
    fetch(`http://localhost:3005/api/v1/users/${user._id}`, {
      method: "PATCH",
      headers: {
        AAccept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => {
      console.log(`Request complete! response:`, res);
    });
  }
  function updateExpenseObject(e) {
    e.preventDefault();
    expense[e.target.name] = e.target.value;
    console.log(expense);
  }
  function submitNewExpense(e) {
    // If no date selected puts current date into income object
    // cant use ! in front of "date"?
    if ("date" in expense) {
      console.log(expense);
    } else {
      expense.date = new Date().toISOString().substr(0, 10);
    }

    e.preventDefault();
    user.expenses.push(expense);
    console.log(user);
    fetch(`http://localhost:3005/api/v1/users/${user._id}`, {
      method: "PATCH",
      headers: {
        AAccept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => {
      console.log(`Request complete! response:`, res);
    });
  }
  function buttonColor(btnColor) {
    return btnColor == display ? "btn-dark" : "btn-secondary";
  }
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col">Labas, {"username"}</div>

          <div className=" col col-auto">
            <button onClick={() => setDisplay("income")} className={`btn ${buttonColor("income")}`}>
              Pajamos
            </button>
          </div>
          <div className="col col-auto">
            <button onClick={(e) => setDisplay("expenses")} className={`btn ${buttonColor("expenses")}`}>
              Islaidos
            </button>
          </div>

          <div>
            <div className="container">
              <div className="col">
                <form
                  className="mr-2"
                  onChange={(e) => {
                    display == "income" ? updateIncomeObject(e) : updateExpenseObject(e);
                  }}
                  onSubmit={(e) => {
                    display == "income" ? submitNewIncome(e) : submitNewExpense(e);
                  }}
                >
                  <div className="row">
                    <div className="col">
                      <div className="form-group mb-4">
                        {/* SUMA */}
                        <input className="form-control" placeholder="Suma" type="number" name="sum" id="sum" maxLength={5} />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        {/* DATA */}
                        <input className="form-control" type="date" name="date" id="date-inp" defaultValue={new Date().toISOString().substr(0, 10)} />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        {/* KATEGORIJA */}
                        <select className="form-control" name="category" id="category">
                          <option value="none">Kategorija 🔽</option>
                          <option value="wage">Alga</option>
                          <option value="prize">Prizas</option>
                          <option value="etc">Kita</option>
                        </select>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        {/* PAVADINIMAS */}
                        <input className="form-control mb-4" placeholder="Pavadinimas" type="text" name="name" id="name" />
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
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
