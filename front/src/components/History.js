import React, { useState, useEffect } from "react";
import { getAllUsersData } from "../api/library/UsersAPI";
import HistoryTable from "./HistoryTable.js";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log(users);

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    getAllUsersData().then((res) => {
      setUsers(res.data.data.users[0]);
      console.log(res.data.data.users[0]);
      setIsLoading(true);
    });
  }

  if (isLoading) {
    let { income } = users;
    let { expenses } = users;

    let incomeExpenses = [...income, ...expenses];

    function sortByDate(a, b) {
      if (a.createdAt < b.createdAt) {
        return 1;
      }
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      return 0;
    }

    const incomeExpensesSortedByDate = incomeExpenses.sort(sortByDate);

    // var userData = users.map((item) => {
    //   return <HistoryTable userID={item._id} />;
    // });

    var userIncomeExpenses = incomeExpensesSortedByDate.map((item) => {
      return <HistoryTable getUsers={getUsers} key={item._id} id={item._id} name={item.name} category={item.category} date={item.date} sum={item.sum} dateCreated={item.createdAt} type={item.type} userID={users._id} />;
    });
  }

  return (
    <>
      <div className="container ">
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

export default UsersList;
