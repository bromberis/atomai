import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createUser, getEmail } from "../../api/library/UsersAPI";

export default function Registration() {
  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  let [emailAlreadyExists, setEmailAlreadyExists] = useState(false);
  //   const bcrypt = require("bcrypt");
  //   const saltRounds = 10;
  //   const myPlaintextPassword = "s0//P4$$w0rD";
  //   const someOtherPlaintextPassword = "not_bacon";
  var bcrypt = require("bcryptjs");
  var salt = bcrypt.genSaltSync(10);
  // var hash = bcrypt.hashSync("B4c0//", salt);
  // console.log(hash);

  function onSubmit(data) {
    let hashedPassword = bcrypt.hashSync(data.password, salt);
    data.password = hashedPassword;
    console.log(data);
    createUser(data);
  }
  function doesEmailExist(res, email) {
    console.log(res.data.data.email, email);
    console.log(res.data.data.email == email);
    res.data.data.email == email && setEmailAlreadyExists(true);
  }

  // function test(email) {
  //   console.log(email;
  //   getEmail("onrj@gmail.com");
  // }
  let email = "onrj@gmail.com";
  getEmail(email);

  let password = watch("password");
  let passwordRepeat = watch("passwordRepeat");

  let testEmail = "Meda@gmail.com";
  let tt = "onrj@gmail.com";

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            id="name"
            placeholder="Vardas"
            {...register("name", {
              required: "Vardas butinas",
              maxLength: 12,
              minLength: 2,
              pattern: /^[[^A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ0-9_ .+-]*$/i,
            })}
          />
          {errors.name?.type === "required" && "Vardas butinas"}
          {errors.name?.type === "minLength" && "Bent 2 simboliai"}
          {errors.name?.type === "maxLength" && "Ne daugiau kaip 12 simboliu"}
          {/* {errors.name && <span className="text-danger fw-light">Vardas butinas. (Bent 2 simboliai ir ne daugiau kaip 12)</span>} */}
        </div>
        <div>
          <input
            type="email"
            id="email"
            placeholder="El. paštas"
            {...register("email", {
              required: true,
              maxLength: 50,
              validate: {
                emailExists: (value) => {
                  getEmail({ email: value }).then((res) => doesEmailExist(res, value));
                  console.log(emailAlreadyExists, emailAlreadyExists);
                  return !emailAlreadyExists;
                },
              },
            })}
          />
          {errors.name?.type === "required" && "El.pasštas butinas"}
          {errors.name?.type === "maxLength" && "Ne daugiau kaip 50 simboliu"}
          {errors.email?.type === "emailExists" && "jau egzistuoja"}
        </div>
        <div>
          <input
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

          {errors?.password?.type === "required" && "Slaptažodis butinas"}
          {errors?.password?.type === "minLength" && "Bent 8 simboliai"}
          {errors?.password?.type === "maxLength" && "Ne daugiau kaip 20 simboliu"}
        </div>
        <div>
          <input
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
          {errors.passwordRepeat?.type === "required" && "Slaptažodis butinas"}
          {errors.name?.type === "minLength" && "Bent 8 simboliai"}
          {errors.name?.type === "maxLength" && "Ne daugiau kaip 20 simboliu"}
          {errors.passwordRepeat?.type === "passwordMatch" && "Slaptazodziai turi sutapti"}
        </div>
        <input
          type="number"
          name="balance"
          id="balance"
          placeholder="Pradinis balansas (neprivalomas)"
          {...register("balance", {
            required: false,
            maxLength: 10,
          })}
        />
        {errors.name?.type === "maxLength" && "Ne daugiau kaip 10 skaiciu"}

        <p>
          <button type="submit">Register</button>
        </p>
      </form>
      <button onClick={() => test()}>find</button>
    </div>
  );
}
