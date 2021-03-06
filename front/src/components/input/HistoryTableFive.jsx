import React, { useState } from "react";
import "../history/History.css";
import { BsTrash, BsPencil } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import { ImArrowLeft2 } from "react-icons/im";
import EditIncomeHistoryForm from "../history/EditIncomeHistoryForm";
import EditExpensesHistoryForm from "../history/EditExpensesHistoryForm";
import {
  findIncomeAndDelete,
  findExpensesAndDelete,
} from "../../api/library/UsersAPI";
import swal from "sweetalert";
import { useGlobalUserContext, UserContext } from "../context/UserContext";
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
  const { userData, updateUserData } = useGlobalUserContext(UserContext);

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
          <Tooltip title="I??trinti">
            <button
              className="btn  m-1 custom-button-tr"
              onClick={() =>
                swal({
                  title: "Ar tikrai norite i??trinti?",
                  icon: "warning",
                  buttons: ["At??aukti", "Gerai"],
                }).then((isConfirm) => {
                  if (isConfirm) {
                    if (type === "income") {
                      findIncomeAndDelete(userData._id, id).then(() =>
                        updateUserData(userData._id)
                      );
                    } else if (type === "expenses") {
                      findExpensesAndDelete(userData._id, id).then(() =>
                        updateUserData(userData._id)
                      );
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
            getUsers={getUsers}
            key={id}
            id={id}
            name={name}
            category={category}
            date={date}
            sum={sum}
            dateCreated={dateCreated}
            type={type}
            editFormStatus={editFormStatus}
            setEditFormStatus={setEditFormStatus}
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
            editFormStatus={editFormStatus}
            setEditFormStatus={setEditFormStatus}
          />
        )}
      </tr>
    </>
  );
}

export default HistoryTable;
