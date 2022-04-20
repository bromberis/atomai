import React, { useEffect, useState } from "react";
import "./Income.css";

export default function Income() {
  let [user, setUser] = useState({});
  let [income, setIncome] = useState({});

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
  // todays date ISO format?
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
      method: "PUT",
      headers: {
        AAccept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => {
      console.log(`Request complete! response:`, res);
    });
  }

  // for (var i = 1; i < users.length; i++)
  //   for (var j = 0; j < i; j++)
  //     if (user[i].date < user[j].date) {
  //       var x = user[i];
  //       user[i] = user[j];
  //       user[j] = x;
  //     }

  return (
    <div>
      <div className="container">
        <div className="col">
          <form onChange={(e) => updateIncomeObject(e)} onSubmit={(e) => submitNewIncome(e)}>
            <div className="row">
              <div className="col">
                <div className="form-group mb-4">
                  {/* <label htmlFor="sum">Suma</label> */}
                  <input className="form-control" placeholder="Suma" type="number" name="sum" id="sum" maxLength={5} />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  {/* <label className="form-control" htmlFor="date">
            Data
          </label> */}
                  <input className="form-control" type="date" name="date" id="date-inp" defaultValue={new Date().toISOString().substr(0, 10)} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  {/* <label className="form-control" htmlFor="category">
            Kategorija
          </label> */}
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
                  {/* <label className="form-control" htmlFor="incomeName">
            Pavadinimas
          </label> */}
                  <input className="form-control mb-4" placeholder="Pavadinimas" type="text" name="name" id="name" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h4>Balansas: {user.balance}</h4>
              </div>
            </div>
            <div className="row">
              <div className="col text-center">
                <button className="btn btn-success mt-3 w-25" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
