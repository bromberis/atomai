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

  const { setLoginData, doLogin, loginData, setIsLoading } =
    useGlobalUserContext(UserContext);

  function onSubmit(data) {
    // loginUser(data);
    console.log(data);
    setIsLoading(true);
    // setLoginData(data);
    doLogin(data);
  }
  console.log(loginData);

  return (
    <div className="Login-container container">
      <div className="row">
        <div className="col">
          <h1>Prisijungimas</h1>
        </div>
        <div className="row">
          <form className="Login-form" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              id="email"
              placeholder="El. paštas"
              {...register("email", {
                required: "El.paštas būtinas",
                maxLength: {
                  value: 50,
                  message: "Nedaugiau kaip 50 simbolių",
                },
              })}
            />
            <span className="error text-danger fw-light">
              {errors.email?.message}
            </span>

            <input
              type="password"
              name="password"
              placeholder="Slaptažodis"
              {...register("password", {
                required: "Slaptažodis būtinas",
                minLength: {
                  value: 8,
                  message: "Turi būti bent 8 simboliai",
                },
                maxLength: {
                  value: 20,
                  message: "Nedaugiau kaip 20 simbolių",
                },
              })}
            />
            <span className="error text-danger fw-light">
              {errors.password?.message}
            </span>
            <div className="Login-button">
              <button className="custom-button" type="submit">
                Prisijungti
              </button>
            </div>
            <div className="Login-button">
              <button className="custom-button" type="reset">
                Anuliuoti
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
