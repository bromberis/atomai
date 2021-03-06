import React from "react";
import { useGlobalUserContext } from "../context/UserContext";
import HistoryTableFive from "./HistoryTableFive.jsx";

function LastInputs() {
  const { userData } = useGlobalUserContext();

  if (Object.keys(userData).length !== 0) {
    let incomeExpenses = [...userData.income, ...userData.expenses];

    function sortByDate(a, b) {
      if (a.createdAt < b.createdAt) {
        return 1;
      }
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      return 0;
    }

    const incomeExpensesSortedByDate = incomeExpenses
      .sort(sortByDate)
      .slice(0, 5);

    var userIncomeExpenses = incomeExpensesSortedByDate.map((item) => {
      return (
        <HistoryTableFive
          key={item._id}
          id={item._id}
          name={item.name}
          category={item.category}
          date={item.date}
          sum={item.sum}
          dateCreated={item.createdAt}
          type={item.type}
        />
      );
    });
  }
  return (
    <>
      <div className="container pl-0 ">
        <table className="table">
          <thead className="mb-2">
            <tr className="text-center">
              <th scope="col">Įrašo data</th>
              <th scope="col">Data</th>
              <th scope="col">Suma</th>
              <th scope="col">Kategorija</th>
              <th scope="col">Pastabos</th>
              <th scope="col">Veiksmai</th>
            </tr>
          </thead>
          <tbody className="align-middle">{userIncomeExpenses}</tbody>
        </table>
      </div>
    </>
  );
}

export default LastInputs;
