import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { updateUserById } from "../../api/library/UsersAPI";
import "./Users.css";

export default function UsersUpdateForm({ name, email, id, setIsEditing, searchUsers }) {
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 500);
  }, [loading]);

  function onSubmit(data) {
    data.id = id;
    updateUserById(data)
      .then((res) => {
        swal({
          text: "Vartotojas redaguotas",
          icon: "success",
          button: "Gerai",
          timer: 2000,
        });

        searchUsers({ email: data.email });
      })
      .catch((err) => {
        swal({
          text: "Toks el.paštas jau registruotas",
          icon: "error",
          button: "Gerai",
          timer: 5000,
        });
      });

    reset();
    setIsEditing(false);
  }
  return (
    <div className="container pt-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-4">
            <input
              type="text"
              name="name"
              placeholder="Vardas"
              defaultValue={name}
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
              defaultValue={email}
              {...register("email", {
                required: true,
                maxLength: 50,
              })}
            />
            <span className="text-danger fw-light">
              {errors.email?.type === "required" && "El.paštas būtinas"}
              {errors.email?.type === "maxLength" && "Ne daugiau kaip 50 simbolių"}
              {errors.email?.type === "checkEmail" && "El. paštas jau naudojamas."}
            </span>
          </div>
          <div className="text-start col-4">
            <button type="submit" className="admin-button">
              <AiOutlineCheck color="#7fbc6e" fontSize="1.5em" />
            </button>
            <button
              className="admin-button"
              onClick={() => {
                reset();
                setIsEditing(false);
              }}
            >
              <AiOutlineClose color="#bc6e7f" fontSize="1.5em" />
            </button>
          </div>
        </div>
      </form>
    </div>
    // <div className="container vertical-center">
    //   <form onSubmit={handleSubmit(onSubmit)}>
    //     <div className="row vertical-center">
    //       <div className="col-4">
    //         <input
    //           type="text"
    //           name="name"
    //           placeholder="Vardas"
    //           {...register("name", {
    //             required: true,
    //             pattern: /^[[^A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ0-9]*$/i,
    //             maxLength: 12,
    //             minLength: 2,
    //           })}
    //         />
    //         <span className="text-danger fw-light">
    //           {errors.name?.type === "pattern" && "Negali būti specialų simbolių"}
    //           {errors.name?.type === "required" && "Vardas būtinas"}
    //           {errors.name?.type === "minLength" && "Turi būti bent 2 simboliai"}
    //           {errors.name?.type === "maxLength" && "Ne daugiau kaip 12 simbolių"}
    //         </span>
    //       </div>

    //       <div className="col-4">
    //         <input
    //           type="email"
    //           id="email-register"
    //           placeholder="El. paštas"
    //           {...register("email", {
    //             required: true,
    //             maxLength: 50,
    //           })}
    //         />
    //         <span className="text-danger fw-light">
    //           {errors.email?.type === "required" && "El.paštas būtinas"}
    //           {errors.email?.type === "maxLength" && "Ne daugiau kaip 50 simbolių"}
    //           {errors.email?.type === "checkEmail" && "El. paštas jau naudojamas."}
    //         </span>
    //       </div>
    //       <div className="col-4 d-flex">
    //         <button type="submit" className="me-2 mb-2 mt-2">
    //           <AiOutlineCheck color="#3a3845" fontSize="1.5em" />
    //         </button>
    //         <button
    //           className="
    //         mb-2 mt-2"
    //         >
    //           <AiOutlineClose color="#3a3845" fontSize="1.5em" />
    //         </button>
    //       </div>
    //     </div>
    //   </form>
    // </div>
  );
}
