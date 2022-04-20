import React, { useState, useEffect } from "react";
import { getAllUsersData } from "../api/library/UsersAPI";
import HistoryTable from "./HistoryTable.js";

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsersData().then((res) => {
      setUsers(res.data.data.users);
      // console.log(res.data.data.users);
    });
  }, []);

  console.log(users);
  // console.log(users[0].expenses[0].category);

  let usersList = users.map((user) => {
    return (
      <HistoryTable
        key={user._id}
        name={user.name}
        email={user.email}
        expenses={user.expenses}
      />
    );
  });

  return (
    <>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Data</th>
              <th scope="col">Suma</th>
              <th scope="col">Kategorija</th>
              <th scope="col">Pavadinimas</th>
              <th scope="col">Veiksmai</th>
            </tr>
          </thead>
          <tbody>{usersList}</tbody>
        </table>
      </div>
    </>
  );
}

export default UsersList;
