import React from "react";

function HistoryTable({ name, email, expenses }) {
  console.log(expenses);

  return (
    <>
      <p>{name}</p>
      <p>{email}</p>
      <p></p>
    </>
  );
}

export default HistoryTable;
