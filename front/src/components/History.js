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
      <HistoryTable key={user._id} name={user.name} expenses={user.expenses} />
    );
  });

  return <>{usersList}</>;
}

export default UsersList;
