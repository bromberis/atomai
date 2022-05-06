import React, { useState } from "react";
import "./History.css";
import { BsTrash, BsPencil } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import { ImArrowLeft2 } from "react-icons/im";
import EditIncomeHistoryForm from "./EditIncomeHistoryForm";
import EditExpensesHistoryForm from "./EditExpensesHistoryForm";
import {
  findIncomeAndDelete,
  findExpensesAndDelete,
} from "../../api/library/UsersAPI";
import swal from "sweetalert";
import Tooltip from "@mui/material/Tooltip";

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
      return "text-income text-center ";
    } else {
      return "text-expenses text-center ";
    }
  };

  let colorClassSum = (str) => {
    if (str === "income") {
      return "income-sum smaller-td";
    } else {
      return "expenses-sum smaller-td";
    }
  };
  let addOperator = (sum, type) => {
    if (type === "income") {
      return "+" + sum;
    } else {
      return "-" + sum;
    }
  };

  const [editFormStatus, setEditFormStatus] = useState(false);

  const [nameLength, setNameLength] = useState(findNameStatus);

  function findNameStatus() {
    if (undefined !== name && name !== null && name.length <= 15) {
      return true;
    } else if (undefined !== name && name !== null && name.length > 15) {
      return false;
    }
  }

  function changeNameLengthStatus() {
    setNameLength(!nameLength);
  }

  return (
    <>
      <tr className={colorClass(type)}>
        <td className="smaller-td ">{dateCreated.slice(0, 10)}</td>
        <td className="smaller-td">{date.slice(0, 10)}</td>
        <td className={colorClassSum(type)}>{addOperator(sum, type)}</td>
        <td className="smaller-td">{category}</td>
        <td>
          {nameLength
            ? name !== undefined && UppercaseFirst(name)
            : name !== undefined && UppercaseFirst(name).substring(0, 15)}
          {name !== undefined && name.length > 15 && nameLength === false && (
            <Tooltip title="Pilnas tekstas">
              <button
                onClick={changeNameLengthStatus}
                className="btn custom-button-more"
              >
                <FiMoreHorizontal />
              </button>
            </Tooltip>
          )}
          {name !== undefined && name.length > 15 && nameLength === true && (
            <Tooltip title="Atgal">
              <button
                onClick={changeNameLengthStatus}
                className="btn custom-button-more"
              >
                <ImArrowLeft2 />
              </button>
            </Tooltip>
          )}
        </td>
        <td className="smaller-td">
          <Tooltip title="Redaguoti">
            <button
              className="btn m-1 custom-button-edit"
              onClick={() => setEditFormStatus(!editFormStatus)}
            >
              <BsPencil color="#3a3845" fontSize="1.5em" />
            </button>
          </Tooltip>
          <Tooltip title="Ištrinti">
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
          </Tooltip>
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
