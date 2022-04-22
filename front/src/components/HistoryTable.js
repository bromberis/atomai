import React from "react";
import "./History.css";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

function HistoryTable({ name, category, date, sum, dateCreated, id }) {
  let UppercaseFirst = (str) => {
    let newStr = str.charAt(0).toUpperCase() + str.slice(1);
    return newStr;
  };

  return (
    <>
      <tr>
        <td>{dateCreated.slice(0, 10)}</td>
        <td>{date.slice(0, 10)}</td>
        <td>{sum}</td>
        <td>{UppercaseFirst(category)}</td>
        <td>{UppercaseFirst(name)}</td>
        <td>
          <button className="btn btn-outline-warning m-1 custom-button">
            <BiEdit />
          </button>
          <button className="btn btn-outline-danger m-1 custom-button">
            <BsTrash />
          </button>
        </td>
      </tr>
    </>
  );
}

export default HistoryTable;
