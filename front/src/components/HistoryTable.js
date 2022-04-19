import React from "react";
import "./History.css";

function HistoryTable({ name, email }) {
  return (
    <>
      <tr>
        <td>data</td>
        <td>{name}</td>
        <td>{email}</td>
        <td></td>
        <td>
          <button className="btn btn-outline-warning m-1 custom-button">
            Update
          </button>
          <button className="btn btn-outline-danger m-1 custom-button">
            Delete
          </button>
        </td>
      </tr>

      {/* <div>{name}</div>
      <div>{email}</div>
      <div>{JSON.stringify(expenses)}</div> */}
    </>
  );
}

export default HistoryTable;
