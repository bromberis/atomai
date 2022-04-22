import React, { useState, useEffect } from "react";
import { MdDoneOutline } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { getAllUsersData } from "../api/library/UsersAPI";

// import "./History.css";

function EditIncomeHistoryForm({
  name,
  category,
  date,
  sum,
  dateCreated,
  id,
  type,
  userID,
}) {
  const [user, setUser] = useState({});
  const [userUpdateIncome, setUserUpdateIncome] = useState({});

  const getUser = () => {
    getAllUsersData().then((res) => {
      setUser(res.data.data.users[0]);
      console.log(res.data.data.users[0]);
    });
  };

  useEffect(() => getUser(), []);

  function updateIncomeObject(e) {
    e.preventDefault();
    userUpdateIncome[e.target.name] = e.target.value;
  }

  function updateIncome() {
    user.income.push(userUpdateIncome);

    fetch(`http://localhost:3005/api/v1/users/${userID}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userUpdateIncome),
    }).then((res) => {
      console.log(`Request complete! response:`, res);
    });
  }

  return (
    <>
      <td>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateIncome();
            console.log("submit");
          }}
        >
          <div>
            <input
              className="form-control"
              type="date"
              name="date"
              id="date-inp"
              defaultValue={date.slice(0, 10)}
              onChange={(e) => updateIncomeObject(e)}
            />
          </div>
          <div>
            <input
              className="form-control custom-input"
              placeholder="Suma"
              type="number"
              name="sum"
              id="sum"
              // maxLength={5}
              defaultValue={sum}
              onChange={(e) => updateIncomeObject(e)}
            />
          </div>
          <div>
            <select
              className="form-control"
              name="category"
              id="category"
              onChange={(e) => updateIncomeObject(e)}
            >
              <option defaultValue={category}>{category}</option>
              <option value="wage">Alga</option>
              <option value="bonus">Premija</option>
              <option value="gift">Dovana</option>
              <option value="lottery">Loterija</option>
              <option value="allowance">Išmoka</option>
              <option value="etc">Kita</option>
            </select>
          </div>
          <div>
            <input
              className="form-control custom-input"
              placeholder="Name"
              type="text"
              name="name"
              id="name"
              defaultValue={name}
              onChange={(e) => updateIncomeObject(e)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-outline-warning m-1 custom-button"
            >
              <MdDoneOutline />
            </button>
            <button className="btn btn-outline-danger m-1 custom-button">
              <GiCancel />
            </button>
          </div>
        </form>
      </td>
    </>
  );
}

export default EditIncomeHistoryForm;
