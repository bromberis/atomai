import React, { useState } from "react";
import "./History.css";
import { BsTrash, BsPencil } from "react-icons/bs";
import EditIncomeHistoryForm from "./EditIncomeHistoryForm";
import EditExpensesHistoryForm from "./EditExpensesHistoryForm";
import {
  findIncomeAndDelete,
  findExpensesAndDelete,
} from "../api/library/UsersAPI";
import swal from "sweetalert";

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
      return "text-income text-center";
    } else {
      return "text-expenses text-center";
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
        <td className="smaller-td">{dateCreated.slice(0, 10)}</td>
        <td className="smaller-td">{date.slice(0, 10)}</td>
        <td className={colorClassSum(type)}>{sum}</td>
        <td>{category}</td>
        <td>{name && UppercaseFirst(name)}</td>
        <td className="smaller-td">
          <button
            className="btn m-1 custom-button-edit"
            onClick={() => setEditFormStatus(!editFormStatus)}
          >
            <BsPencil color="#3a3845" fontSize="1.5em" />
          </button>
          <button
            className="btn  m-1 custom-button-tr"
            onClick={() =>
              swal({
                title: "Ar tikrai norite ištrinti?",
                icon: "warning",
                buttons: ["Atšaukti", "Gerai"],
              }).then((isConfirm) => {
                if (isConfirm) {
                  if (type === "income") {
                    findIncomeAndDelete(userID, id).then(() => getUsers());
                  } else if (type === "expenses") {
                    findExpensesAndDelete(userID, id).then(() => getUsers());
                  }
                }
              })
            }
          >
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
