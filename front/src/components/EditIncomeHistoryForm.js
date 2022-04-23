import React, { useState, useEffect } from "react";
import { MdDoneOutline } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { findIncomeDataAndUpdate } from "../api/library/UsersAPI";

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
  console.log("enter income");
  const [userUpdateIncome, setUserUpdateIncome] = useState({
    sum: sum,
    name: name,
    date: date,
    category: category,
  });

  function updateIncomeObject(e) {
    e.preventDefault();
    userUpdateIncome[e.target.name] = e.target.value;
    console.log(userUpdateIncome);
    // {...userUpdateIncome, id:99, id:777}
  }

  return (
    <>
      <td>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            findIncomeDataAndUpdate(userUpdateIncome, userID, id);
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
              className="form-select"
              name="category"
              id="category"
              onChange={(e) => updateIncomeObject(e)}
            >
              <option defaultValue={category}>{category}</option>
              <option value="Alga">Alga</option>
              <option value="Premija">Premija</option>
              <option value="Dovana">Dovana</option>
              <option value="Loterija">Loterija</option>
              <option value="Išmoka">Išmoka</option>
              <option value="Kita">Kita</option>
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
