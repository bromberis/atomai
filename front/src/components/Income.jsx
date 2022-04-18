import React, { useEffect, useState } from "react";

export default function Income() {
  let [user, setUser] = useState({});
  let [income, setIncome] = useState({});

  const getUser = () => {
    fetch(`http://localhost:3005/api/v1/users/62598440d1d7cc645c6b821b`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data.users);
        setUser(result.data.users);
        user = result.data.users;
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
  return (
    <div>
      <form onChange={(e) => updateIncomeObject(e)} onSubmit={(e) => submitNewIncome(e)}>
        <label htmlFor="sum">Suma</label>
        <input type="number" name="sum" id="sum" maxLength={5} />
        <label htmlFor="date">Data</label>
        <input type="date" name="date" id="date" defaultValue={new Date().toISOString().substr(0, 10)} />
        <label htmlFor="category">Kategorija</label>
        <select name="category" id="category">
          <option value="wage">Alga</option>
          <option value="prize">Prizas</option>
          <option value="etc">Kita</option>
        </select>
        <label htmlFor="incomeName">Pavadinimas</label>
        <input type="text" name="incomeName" id="incomeName" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
