import { compareSync } from "bcryptjs";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createUser, getEmail, getUsersByEmail } from "../../api/library/UsersAPI";
import "./Users.css";
import swal from "sweetalert";

import UsersSearch from "./UsersSearch";

export default function Users() {
  const {
    watch,
    register,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm();
  const [users, setUsers] = useState({});

  //let [usersData, setUsersData] = useState([]);
  useEffect(() => {}, [users]);

  function onSubmit(data) {
    console.log(data);
    createUser(data)
      .then((result) => {
        console.log("Success:", result);
        swal({
          text: "Vartotojas pridėtas",
          icon: "success",
          button: "Puiku",
          timer: 2000,
        });
        reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        swal({
          text: "Toks vartotojas jau egzistuoja",
          icon: "error",
          button: "Gerai",
          timer: 5000,
        });
      });
  }

  return (
    <div className="container text-center">
      <div className="container text-center">
        <div className="row">
          <div className="col-10">
            <h2 className="admin-page-titles">Pridėti naują vartotoją</h2>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-4">
              <input
                type="text"
                name="name"
                placeholder="Vardas"
                {...register("name", {
                  required: true,
                  pattern: /^[[^A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ0-9]*$/i,
                  maxLength: 12,
                  minLength: 2,
                })}
              />
              <span className="text-danger fw-light">
                {errors.name?.type === "pattern" && "Negali būti specialų simbolių"}
                {errors.name?.type === "required" && "Vardas būtinas"}
                {errors.name?.type === "minLength" && "Turi būti bent 2 simboliai"}
                {errors.name?.type === "maxLength" && "Ne daugiau kaip 12 simbolių"}
              </span>
            </div>
            <div className="col-4">
              <input
                type="email"
                id="email-register"
                placeholder="El. paštas"
                {...register("email", {
                  required: true,
                  maxLength: 50,
                  validate: {
                    checkEmail: async (value) => {
                      let pass = await getEmail(value);

                      return !pass;
                      //await getEmail(value);
                    },
                  },
                })}
              />
              <span className="text-danger fw-light">
                {errors.email?.type === "required" && "El.paštas būtinas"}
                {errors.email?.type === "maxLength" && "Ne daugiau kaip 50 simbolių"}
                {errors.email?.type === "checkEmail" && "El. paštas jau naudojamas."}
              </span>
            </div>
            <div className="col-4">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Slaptažodis"
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 20,
                  pattern: /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9?!@#$%^&*]/,
                })}
              />
              <span className="text-danger fw-light">
                {errors?.password?.type === "required" && "Slaptažodis būtinas"}
                {errors?.password?.type === "minLength" && "Turi būti bent 8 simboliai"}
                {errors?.password?.type === "maxLength" && "Ne daugiau kaip 20 simbolių"}
                {errors?.password?.type === "pattern" && "Turi būti bent 1 didžioji raidė ir bent 1 simbolis"}
              </span>
            </div>

            <div className="row">
              <div className="col-12">
                <button type="submit" className="add-new-user-button">
                  Pridėti
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <UsersSearch />
    </div>
  );
}
