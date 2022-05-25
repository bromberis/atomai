import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UsersTable from "./UsersTable";
import { v4 as uuidv4 } from "uuid";
import { createUser, getEmail, getUsersByEmail } from "../../api/library/UsersAPI";
import "./Users.css";
import swal from "sweetalert";

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
      console.log(res);
      if (res.data.data.users.length < 1) {
        swal({
          text: "Tokio vartotoja nerasta",
          icon: "error",
          button: "Gerai",
          timer: 2000,
        });
      }
      console.log(res.data.data.users);
      setUsers(res.data.data.users);
      reset();
    });
  }

  let usersData;
  if (users.length > 0) {
    usersData = users.map((user) => {
      return <UsersTable searchUsers={searchUsers} name={user.name} email={user.email} setUsers={setUsers} reset={reset} id={user._id} key={uuidv4()} />;
    });
  }
  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit(searchUsers)}>
          <div className="row">
            <div className="col-10">
              <h2 className="admin-page-titles">Ieškoti vartotojų</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-7 ">
              <input type="text" placeholder="Vartotojo el.paštas" {...register("email", { minLength: 2, required: true })} />
              {errors.email?.type === "minLength" && "Bent 2 simboliai"}
              {errors.email?.type === "required" && "Bent 2 simbloiai"}
            </div>
            <div className="col-5">
              <button className="find-users-button" type="submit">
                Ieškoti
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="container">{usersData}</div>
    </div>
  );
}
