import React, { useState, useEffect } from "react";
import { MdDoneOutline } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { findExpensesDataAndUpdate } from "../api/library/UsersAPI";

// import "./History.css";

function EditExpensesHistoryForm({
  name,
  category,
  date,
  sum,
  dateCreated,
  id,
  type,
  userID,
}) {
  //console.log("enter expenses");
  // console.log(userID);
  // console.log(id);
  const [userUpdateExpenses, setUserUpdateExpenses] = useState({
    sum: sum,
    name: name,
    date: date,
    category: category,
  });

  function updateExpensesObject(e) {
    e.preventDefault();
    userUpdateExpenses[e.target.name] = e.target.value;
    //console.log(userUpdateExpenses);
  }

  return (
    <>
      <td>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            findExpensesDataAndUpdate(userUpdateExpenses, userID, id);
            // console.log("submit");
          }}
        >
          <div>
            <input
              className="form-control"
              type="date"
              name="date"
              id="date-inp"
              defaultValue={date.slice(0, 10)}
              onChange={(e) => updateExpensesObject(e)}
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
              onChange={(e) => updateExpensesObject(e)}
            />
          </div>
          <div>
            <select
              className="form-select"
              name="category"
              id="category"
              onChange={(e) => updateExpensesObject(e)}
            >
              <option defaultValue={category}>{category}</option>
              <option value="Maistas">Pramogos</option>
              <option value="Mokesčiai">Mokesčiai</option>
              <option value="Rūbai">Rūbai</option>
              <option value="Transportas">Transportas</option>
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
              onChange={(e) => updateExpensesObject(e)}
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

export default EditExpensesHistoryForm;
