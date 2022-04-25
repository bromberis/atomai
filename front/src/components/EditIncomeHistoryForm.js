import React, { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { findIncomeDataAndUpdate } from "../api/library/UsersAPI";

import "./History.css";

function EditIncomeHistoryForm({
  name,
  category,
  date,
  sum,
  dateCreated,
  id,
  type,
  userID,
  editFormStatus,
  setEditFormStatus,
  getUsers,
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
      <td className="custom-td"></td>
      <td className="custom-td"></td>
      <td className="custom-td"></td>
      <td className="custom-td">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            findIncomeDataAndUpdate(userUpdateIncome, userID, id).then(() =>
              getUsers()
            );
            setEditFormStatus(!editFormStatus);
          }}
        >
          <div className="mb-1">
            <input
              className="form-control"
              type="date"
              name="date"
              id="date-inp"
              defaultValue={date.slice(0, 10)}
              onChange={(e) => updateIncomeObject(e)}
            />
          </div>
          <div className="mb-1">
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
          <div className="mb-1">
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
          <div className="mb-1">
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
            <button type="submit" className="btn m-1 custom-button-edit">
              <FaCheck color="#7fbc6e" fontSize="1.5em" />
            </button>
            <button
              type="button"
              className="btn  m-1 custom-button-tr"
              onClick={() => setEditFormStatus(!editFormStatus)}
            >
              <ImCross color="#bc6e7f" fontSize="1.4em" />
            </button>
          </div>
        </form>
      </td>
    </>
  );
}

export default EditIncomeHistoryForm;
