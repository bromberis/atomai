import React, { useState, useEffect } from "react";
import { useGlobalUserContext, UserContext } from "../context/UserContext";
import { useGlobalCategoriesContext } from "../context/CategoriesContext";
import HistoryTable from "./HistoryTable.js";

function UsersList(props) {
  const { expensesCategories } = useGlobalCategoriesContext();

  const { userData } = useGlobalUserContext(UserContext);
  const [users, setUsers] = useState({});

  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 2)
    .toISOString()
    .slice(0, 10);

  const currentDate = date.toISOString().slice(0, 10);

  const [startDate, setStartDate] = useState(firstDay);
  const [endDate, setEndDate] = useState(currentDate);
  const [type, setType] = useState("");
  const [expCategory, setExpCategory] = useState("allexp");

  function sortByDate(a, b) {
    if (a.createdAt < b.createdAt) {
      return 1;
    }
    if (a.createdAt > b.createdAt) {
      return -1;
    }
    return 0;
  }

  const updateStartDate = (event) => {
    setStartDate(event.target.value);
  };
  const updateEndDate = (event) => {
    setEndDate(event.target.value);
  };
  const updateType = (event) => {
    setType(event.target.value);
  };

  const updateExpCategory = (event) => {
    setExpCategory(event.target.value);
  };

  console.log("type " + type);
  console.log(expCategory);

  useEffect(() => {
    setUsers(userData);
  });

  if (users != undefined && users.hasOwnProperty("email")) {
    let { income } = users;
    let { expenses } = users;

    let incomeExpenses = [...income, ...expenses];

    const filteredData = incomeExpenses.filter(
      (item) => item.date >= startDate && item.date <= endDate
    );

    if (type === "expenses" && expCategory !== "allexp") {
      var filteredTypeCategory = filteredData.filter(
        (item) => item.type === "expenses" && item.category === expCategory
      );
    } else if (type === "expenses") {
      var filteredTypeCategory = filteredData.filter(
        (item) => item.type === "expenses" && expCategory === "allexp"
      );
    } else if (type === "all") {
      var filteredTypeCategory = filteredData.filter(
        (item) => item.type === "expenses" || item.type === "income"
      );
    }

    var total = filteredTypeCategory.reduce((n, { sum }) => n + sum, 0);
    console.log(total);
    console.log(filteredData);
    console.log(filteredTypeCategory);

    const filteredDataSortedByDate = filteredTypeCategory.sort(sortByDate);

    var userIncomeExpenses = filteredDataSortedByDate.map((item) => {
      return (
        <HistoryTable
          key={item._id}
          id={item._id}
          name={item.name}
          category={item.category}
          date={item.date}
          sum={item.sum}
          dateCreated={item.createdAt}
          type={item.type}
          userID={users._id}
        />
      );
    });
  }

  return (
    <>
      <div className="container pl-0 ">
        <form>
          <div className="row pt-3">
            <div className="col-3">
              <input
                className="rounded-0 input-custom"
                type="date"
                name="date"
                id="date-inp"
                min="2010-01-01"
                max="2099-01-01"
                defaultValue={firstDay}
                onChange={updateStartDate}
              />
            </div>
            <div className="col-3">
              <input
                className="rounded-0 input-custom"
                type="date"
                name="date"
                id="date-inp"
                min="2010-01-01"
                max="2099-01-01"
                defaultValue={currentDate}
                onChange={updateEndDate}
              />
            </div>
            <div className="col-3">
              <select className="rounded-0 input-custom" onChange={updateType}>
                <option value="all">Visi</option>
                <option value="income">Pajamos</option>
                <option value="expenses">Išlaidos</option>
              </select>
            </div>
            {type === "expenses" && (
              <div className="col-3 input-custom">
                <select onChange={updateExpCategory}>
                  <option value="allexp">Visos išlaidos</option>
                  {expensesCategories.map((data) => {
                    const { _id, category } = data;
                    return (
                      <option key={_id} value={category}>
                        {category}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
            {type === "income" && (
              <div className="col-3 input-custom">
                <select>
                  <option>INCOME</option>
                  {/* {expensesCategories.map((data) => {
                    const { _id, category } = data;
                    return (
                      <option key={_id} value={category}>
                        {category}
                      </option>
                    );
                  })} */}
                </select>
              </div>
            )}
          </div>
        </form>
        <div className="row">
          <div className="col-3">
            <p>Viso suma: {total}</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
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
        </div>
      </div>
    </>
  );
}

export default UsersList;
