import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useGlobalUserContext, UserContext } from "../context/UserContext";
import "./style/Login.css";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setLoginData, doLogin, loginData, setIsLoading } = useGlobalUserContext(UserContext);

  function onSubmit(data) {
    // loginUser(data);
    console.log(data);
    setIsLoading(true);
    // setLoginData(data);
    doLogin(data);
  }
  console.log(loginData);

  return (
    <div className="Login-container">
      <h1>Prisijungimas</h1>
      <form className="Login-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          id="email"
          placeholder="El. paštas"
          {...register("email", {
            required: "Laukelis privalomas",
            maxLength: {
              value: 50,
              message: "Daugiausia simbolių galima įvesti 50",
            },
          })}
        />
        <span className="error">{errors.email?.message}</span>

        <input
          type="password"
          name="password"
          placeholder="Slaptažodis"
          {...register("password", {
            required: "Laukelis privalomas",
            minLength: {
              value: 8,
              message: "Mažiausia simbolių galima įvesti 8",
            },
            maxLength: {
              value: 20,
              message: "Daugiausia simbolių galima įvesti 20",
            },
          })}
        />
        <span className="error">{errors.password?.message}</span>
        <div className="Login-button">
          <button className="" type="submit">
            Prisijungti
          </button>
          <button className="" type="reset">
            Anuliuoti
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
