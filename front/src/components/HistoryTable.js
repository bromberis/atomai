import React, { useState } from "react";
import "./History.css";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import EditIncomeHistoryForm from "./EditIncomeHistoryForm";
import EditExpensesHistoryForm from "./EditExpensesHistoryForm";

function HistoryTable({
  name,
  category,
  date,
  sum,
  dateCreated,
  id,
  type,
  income,
  userID,
}) {
  let UppercaseFirst = (str) => {
    let newStr = str.charAt(0).toUpperCase() + str.slice(1);
    return newStr;
  };

  let colorClass = (str) => {
    if (str === "income") {
      return "text-income";
    } else {
      return "text-expenses";
    }
  };

  const [editFormStatus, setEditFormStatus] = useState(false);

  return (
    <>
      <tr className={colorClass(type)}>
        <td>{dateCreated.slice(0, 10)}</td>
        <td>{date.slice(0, 10)}</td>
        <td>{sum}</td>
        <td>{category}</td>
        <td>{name && UppercaseFirst(name)}</td>
        <td>
          <button
            className="btn btn-outline-warning m-1 custom-button"
            onClick={() => setEditFormStatus(true)}
          >
            <BiEdit />
          </button>
          <button className="btn btn-outline-danger m-1 custom-button">
            <BsTrash />
          </button>
        </td>
      </tr>
      <tr>
        {editFormStatus && type === "income" && (
          <EditIncomeHistoryForm
            key={id}
            id={id}
            name={name}
            category={category}
            date={date}
            sum={sum}
            dateCreated={dateCreated}
            type={type}
            userID={userID}
          />
        )}
        {editFormStatus && type === "expenses" && (
          <EditExpensesHistoryForm
            key={id}
            id={id}
            name={name}
            category={category}
            date={date}
            sum={sum}
            dateCreated={dateCreated}
            type={type}
            userID={userID}
          />
        )}
      </tr>
    </>
  );
}

export default HistoryTable;
