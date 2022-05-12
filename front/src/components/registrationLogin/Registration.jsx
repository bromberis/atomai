import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createUser, getUserEmailFront, getUserById } from "../../api/library/UsersAPI";
import "./Registration.css";

export default function Registration() {
  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  let [setEmailAlreadyExists] = useState(false);

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
    <div className="Registration-container ">
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
            pattern: /^[[^A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ0-9]*$/i,
          })}
        />

        <span className="text-danger fw-light">
          {errors.name?.type === "pattern" && "Negali būti specialų simbolių"}
          {errors.name?.type === "required" && "Vardas būtinas"}
          {errors.name?.type === "minLength" && "Turi būti bent 2 simboliai"}
          {errors.name?.type === "maxLength" && "Ne daugiau kaip 12 simbolių"}
        </span>

        <input
          className="reg-input"
          type="email"
          id="email-register"
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
        <span className="text-danger fw-light">
          {errors.email?.type === "required" && "El.paštas būtinas"}
          {errors.email?.type === "maxLength" && "Ne daugiau kaip 50 simbolių"}
          {errors.email?.type === "emailExists" && "El. paštas jau naudojamas."}
        </span>

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
            pattern: /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9?!@#$%^&*]/,
          })}
        />
        <span className="text-danger fw-light">
          {errors?.password?.type === "required" && "Slaptažodis būtinas"}
          {errors?.password?.type === "minLength" && "Turi būti bent 8 simboliai"}
          {errors?.password?.type === "maxLength" && "Ne daugiau kaip 20 simbolių"}
          {errors?.password?.type === "pattern" && "Turi būti bent 1 didžioji raidė ir bent 1 simbolis"}
        </span>
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
        <span className="text-danger fw-light">
          {errors.passwordRepeat?.type === "required" && "Slaptažodis būtinas"}
          {errors.passwordRepeat?.type === "minLength" && "Turi būti bent 8 simboliai"}
          {errors.passwordRepeat?.type === "maxLength" && "Ne daugiau kaip 20 simbolių"}
          {errors.passwordRepeat?.type === "passwordMatch" && "Slaptažodžiai turi sutapti"}
        </span>
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
        <span className="text-danger fw-light">{errors.balance?.type === "maxLength" && "Ne daugiau kaip 10 skaičių"}</span>
        <div className="Registration-button">
          <button type="submit">Registruotis</button>

          <button className="" type="reset">
            Atšaukti
          </button>
        </div>
      </form>
    </div>
  );
}
