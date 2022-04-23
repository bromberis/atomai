import React, { useState } from "react";
import "./History.css";
import { BsTrash, BsPencil } from "react-icons/bs";
import EditIncomeHistoryForm from "./EditIncomeHistoryForm";
import EditExpensesHistoryForm from "./EditExpensesHistoryForm";

function HistoryTable({
  getUsers,
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

  let colorClassSum = (str) => {
    if (str === "income") {
      return "income-sum";
    } else {
      return "expenses-sum";
    }
  };

  const [editFormStatus, setEditFormStatus] = useState(false);

  return (
    <>
      <tr className={colorClass(type)}>
        <td>{dateCreated.slice(0, 10)}</td>
        <td>{date.slice(0, 10)}</td>
        <td className={colorClassSum(type)}>{sum}</td>
        <td>{category}</td>
        <td>{name && UppercaseFirst(name)}</td>
        <td>
          <button
            className="btn m-1 custom-button"
            onClick={() => setEditFormStatus(!editFormStatus)}
          >
            <BsPencil color="#3a3845" fontSize="1.5em" />
          </button>
          <button className="btn  m-1 custom-button">
            <BsTrash color="#bc6e7f" fontSize="1.5em" />
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
            editFormStatus={editFormStatus}
            setEditFormStatus={setEditFormStatus}
            getUsers={getUsers}
          />
        )}
        {editFormStatus && type === "expenses" && (
          <EditExpensesHistoryForm
            getUsers={getUsers}
            key={id}
            id={id}
            name={name}
            category={category}
            date={date}
            sum={sum}
            dateCreated={dateCreated}
            type={type}
            userID={userID}
            editFormStatus={editFormStatus}
            setEditFormStatus={setEditFormStatus}
          />
        )}
      </tr>
    </>
  );
}

export default HistoryTable;
