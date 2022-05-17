import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UsersTable from "./UsersTable";
import { createUser, getEmail, getUsersByEmail } from "../../api/library/UsersAPI";

export default function UsersSearch() {
  const {
    watch,
    register,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm();
  const [users, setUsers] = useState({});
  function searchUsers(data) {
    console.log(data);
    getUsersByEmail(data).then((res) => {
      console.log(res.data.data.users);
      setUsers(res.data.data.users);
    });
  }
  console.log(users);
  let usersData;
  if (users.length > 0) {
    usersData = users.map((user) => {
      return <UsersTable name={user.name} email={user.email} />;
    });
  }
  return (
    <div>
      <div className="container">
        <form onClick={handleSubmit(searchUsers)}>
          <div className="row">
            <div className="col-10">
              <h2 className="admin-page-titles">Ieskoti vartotoju</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-6 ">
              <input type="text" placeholder="Vartotojo el.pastas" {...register("email", { minLength: 1 })} />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <button className="find-users-button" type="submit">
                Ieskoti
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>Vartotojo vardas</th>
              <th>Vartotojo el.pastas</th>
              <th>Veiksmai</th>
            </tr>
          </thead>
          <tbody>{usersData}</tbody>
        </table>
      </div>
    </div>
  );
}
