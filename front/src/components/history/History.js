import React, { useState, useEffect } from "react";
import { useGlobalUserContext, UserContext } from "../context/UserContext";
import { useGlobalCategoriesContext } from "../context/CategoriesContext";
import HistoryTable from "./HistoryTable.js";
import "./History.css";

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
  const [type, setType] = useState("all");
  const [expCategory, setExpCategory] = useState("allexp");
  const [incCategory, setIncCategory] = useState("allinc");
  const [ignoreDates, setIgnoreDates] = useState(false);

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
  const updateIncCategory = (event) => {
    setIncCategory(event.target.value);
  };

  const updateIgnoreDates = (event) => {
    setIgnoreDates(event.target.checked);
  };

  useEffect(() => {
    setUsers(userData);
  }, []);

  if (users !== undefined && users.hasOwnProperty("email")) {
    let incomeExpenses = [...userData.income, ...userData.expenses];
    const filteredData = incomeExpenses.filter((item) => {
      return (
        item.date.slice(0, 10) >= startDate && item.date.slice(0, 10) <= endDate
      );
    });
    var filteredTypeCategory;
    var total;

    // type and category filter
    if (
      type === "expenses" &&
      expCategory !== "allexp" &&
      ignoreDates === false
    ) {
      filteredTypeCategory = filteredData.filter(
        (item) => item.type === "expenses" && item.category === expCategory
      );
      total = filteredTypeCategory.reduce((n, { sum }) => n + sum, 0);
    } else if (type === "expenses" && ignoreDates === false) {
      filteredTypeCategory = filteredData.filter(
        (item) => item.type === "expenses" && expCategory === "allexp"
      );
      total = filteredTypeCategory.reduce((n, { sum }) => n + sum, 0);
    } else if (
      type === "expenses" &&
      expCategory !== "allexp" &&
      ignoreDates === true
    ) {
      filteredTypeCategory = incomeExpenses.filter(
        (item) => item.type === "expenses" && item.category === expCategory
      );
      total = filteredTypeCategory.reduce((n, { sum }) => n + sum, 0);
    } else if (type === "expenses" && ignoreDates === true) {
      filteredTypeCategory = incomeExpenses.filter(
        (item) => item.type === "expenses" && expCategory === "allexp"
      );
      total = filteredTypeCategory.reduce((n, { sum }) => n + sum, 0);
    } else if (type === "all") {
      filteredTypeCategory = filteredData.filter(
        (item) => item.type === "expenses" || item.type === "income"
      );
      const inc = filteredData
        .filter((item) => item.type === "income")
        .reduce((n, { sum }) => n + sum, 0);
      const exp = filteredData
        .filter((item) => item.type === "expenses")
        .reduce((n, { sum }) => n + sum, 0);
      total = inc - exp;
    } else if (type === "income" && incCategory !== "allinc") {
      filteredTypeCategory = filteredData.filter(
        (item) => item.type === "income" && item.category === incCategory
      );
      total = filteredTypeCategory.reduce((n, { sum }) => n + sum, 0);
    } else if (type === "income") {
      filteredTypeCategory = filteredData.filter(
        (item) => item.type === "income" && incCategory === "allinc"
      );
      total = filteredTypeCategory.reduce((n, { sum }) => n + sum, 0);
    }

    // final sort by createdAt date
    const filteredDataSortedByDate = filteredTypeCategory.sort(sortByDate);

    var userIncomeExpenses = filteredDataSortedByDate.map((item) => {
      return (
        <HistoryTable
          username={users.name}
          key={item._id}
          id={item._id}
          name={item.name}
          category={item.category}
          date={item.date}
          sum={item.sum}
          email={users.email}
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
            <div className="col-6">
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
            <div className="col-6">
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
            <div className="col-6">
              <select className="rounded-0 input-custom" onChange={updateType}>
                <option value="all">Visi ??vykiai</option>
                <option value="income">Pajamos</option>
                <option value="expenses">I??laidos</option>
              </select>
            </div>
            {type === "expenses" && (
              <div className="col-6">
                <select
                  onChange={updateExpCategory}
                  className="input-custom"
                  defaultValue={expCategory}
                >
                  <option value="allexp">Visos i??laidos</option>
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
              <div className="col-6 ">
                <select
                  onChange={updateIncCategory}
                  className="input-custom"
                  defaultValue={incCategory}
                >
                  <option value="allinc">Visos pajamos</option>
                  <option value="Alga">Alga</option>
                  <option value="Premija">Premija</option>
                  <option value="Dovana">Dovana</option>
                  <option value="Loterija">Loterija</option>
                  <option value="I??moka">I??moka</option>
                  <option value="Kita">Kita</option>
                </select>
              </div>
            )}
          </div>
        </form>
        <div className="row">
          <div className="col-6 custom-balance">
            {total !== undefined && type === "expenses" && (
              <p>
                Visos i??laidos:{" "}
                <span className="fw-bold">{total.toFixed(2)}</span>
              </p>
            )}
            {total !== undefined && type === "income" && (
              <p>
                Visos pajamos :{" "}
                <span className="fw-bold">{total.toFixed(2)}</span>
              </p>
            )}
            {total !== undefined && type === "all" && (
              <p>
                Bendras balansas :{" "}
                <span className="fw-bold">{total.toFixed(2)}</span>
              </p>
            )}
          </div>
          {type === "expenses" && (
            <div className="col-6">
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Ignoruoti datas, visos kategorijos i??laidos
              </label>
              <input
                className="custom-box"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                onChange={updateIgnoreDates}
              />
            </div>
          )}
        </div>
        <div className="row">
          <div className="col px-3">
            <table className="table">
              <thead className="mb-2">
                <tr className="text-center">
                  <th scope="col">??ra??o data</th>
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
