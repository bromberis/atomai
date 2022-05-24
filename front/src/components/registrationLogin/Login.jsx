import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useGlobalUserContext, UserContext } from "../context/UserContext";
import "./style/Login.css";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { createNewLog } from "../../api/library/logsApi";

function Login(props) {
  console.log(props);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { doLogin } = useGlobalUserContext(UserContext);

  let navigate = useNavigate();
  function onSubmit(data) {
    doLogin(data)
      .then((res) => {
        let user = res.data.user;

        swal({
          text: "Pavyko prisijungti!",
          icon: "success",
          button: "Puiku",
          timer: 5000,
        });
        createNewLog({ category: "login", userID: user._id, action: `Vartotojas ${user.name} prisijungė. Laikas: ${new Date()}`, time: new Date(), sum: data.sum, name: user.name, email: user.email });
        if (res.status == 200) {
          setTimeout(() => {
            navigate("/incexp");
          }, 1000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        swal({
          text: "Duomenys blogai suvesti, galimai rašybos klaida!",
          icon: "error",
          button: "Gerai",
          timer: 2000,
        });
      });
  }

  return (
    <div className="Login-container container">
      <div className="row">
        <div className="col">
          <h1 className="pb-3">Prisijungimas</h1>
        </div>
        <div className="row">
          <form className="Login-form" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              id="email-login"
              placeholder="El. paštas"
              {...register("email", {
                required: "El.paštas būtinas",
                maxLength: {
                  value: 50,
                  message: "Nedaugiau kaip 50 simbolių",
                },
              })}
            />
            <span className="error text-danger fw-light">{errors.email?.message}</span>

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
            <span className="error text-danger fw-light">{errors.password?.message}</span>
            <div className="Login-button">
              <button className="custom-button" type="submit">
                Prisijungti
              </button>
            </div>
            <div className="Login-button">
              <button className="custom-button" type="reset">
                Atšaukti
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
