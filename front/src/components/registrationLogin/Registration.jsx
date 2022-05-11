import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createUser, getUserEmailFront, getUserById } from "../../api/library/UsersAPI";
import "./Registration.css";

import axios from "axios";

export default function Registration() {
  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  let [emailAlreadyExists, setEmailAlreadyExists] = useState(false);

  var bcrypt = require("bcryptjs");
  var salt = bcrypt.genSaltSync(10);

  function onSubmit(data) {
    createUser(data);
  }
  function doesEmailExist(res) {
    console.log(res.data.data.users);
    res.data.data.users ? setEmailAlreadyExists(false) : setEmailAlreadyExists(true);
  }

  let password = watch("password");

  return (
    <div className="Registration-container">
      <h1>Registracija</h1>
      <form className="Registration-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="reg-input"
          type="text"
          id="name"
          placeholder="Vardas"
          {...register("name", {
            required: "Vardas būtinas",
            maxLength: 12,
            minLength: 2,
            pattern: /^[[^A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ0-9_ ]*$/i,
          })}
        />
        {errors.name?.type === "pattern" && "Negali būti specialų simbolių"}
        {errors.name?.type === "required" && "Vardas būtinas"}
        {errors.name?.type === "minLength" && "Turi būti bent 2 simboliai"}
        {errors.name?.type === "maxLength" && "Ne daugiau kaip 12 simbolių"}
        {/* {errors.name && <span className="text-danger fw-light">Vardas butinas. (Bent 2 simboliai ir ne daugiau kaip 12)</span>} */}

        <input
          className="reg-input"
          type="email"
          id="email"
          placeholder="El. paštas"
          {...register("email", {
            required: true,
            maxLength: 50,
            validate: {
              emailExists: (value) => {
                let pass;
                getUserEmailFront(value, pass).then(function (res) {
                  doesEmailExist(res, value);
                  return res.data.data.users.email === value;
                });

                return pass;
              },
            },
          })}
        />
        {errors.email?.type === "required" && "El.paštas būtinas"}
        {errors.email?.type === "maxLength" && "Ne daugiau kaip 50 simbolių"}
        {errors.email?.type === "emailExists" && "El. paštas jau naudojamas."}

        <input
          className="reg-input"
          type="password"
          id="password"
          name="password"
          placeholder="Slaptažodis"
          {...register("password", {
            required: true,
            minLength: 8,
            maxLength: 20,
          })}
        />
        {errors?.password?.type === "required" && "Slaptažodis būtinas"}
        {errors?.password?.type === "minLength" && "Turi būti bent 8 simboliai"}
        {errors?.password?.type === "maxLength" && "Ne daugiau kaip 20 simbolių"}
        <input
          className="reg-input"
          type="password"
          id="passwordRepeat"
          placeholder="Pakartokite slaptažodį"
          {...register("passwordRepeat", {
            required: true,
            minLength: 8,
            maxLength: 20,
            validate: { passwordMatch: (value) => value == password },
          })}
        />
        {errors.passwordRepeat?.type === "required" && "Slaptažodis būtinas"}
        {errors.passwordRepeat?.type === "minLength" && "Turi būti bent 8 simboliai"}
        {errors.passwordRepeat?.type === "maxLength" && "Ne daugiau kaip 20 simbolių"}
        {errors.passwordRepeat?.type === "passwordMatch" && "Slaptažodžiai turi sutapti"}
        <input
          className="reg-input"
          type="number"
          name="balance"
          id="balance"
          placeholder="Pradinis balansas (neprivalomas)"
          {...register("balance", {
            required: false,
            maxLength: 10,
          })}
        />
        {errors.balance?.type === "maxLength" && "Ne daugiau kaip 10 skaicių"}
        <div className="Registration-button">
          <button type="submit">Registruotis</button>
          <button className="" type="reset">
            Anuliuoti
          </button>
        </div>
      </form>
    </div>
  );
}
