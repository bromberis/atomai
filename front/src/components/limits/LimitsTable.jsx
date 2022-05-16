import React from "react";

function LimitsTable(props) {
  const { limit, category } = props;

  return (
    <>
      <div>{category}</div>
      <div>{limit}</div>
    </>
  );
}

export default LimitsTable;
