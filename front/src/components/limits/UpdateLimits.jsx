import React, { useState, useEffect } from "react";
import { useGlobalCategoriesContext } from "../context/CategoriesContext";
import { useGlobalUserContext } from "../context/UserContext";
import { useGlobalLimitsContext } from "../context/LimitsContext";
import { useForm } from "react-hook-form";
import { findLimitAndUpdate } from "../../api/library/UsersAPI";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

import Tooltip from "@mui/material/Tooltip";
import "./Limits.css";

function UpdateLimits(props) {
  const { subID, category, setIsEditing } = props;
  const { userData } = useGlobalUserContext();
  const { refreshLimitsData } = useGlobalLimitsContext();
  const [updateInfo, setUpdateInfo] = useState({ category, limit: "" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleInputChange = (event) => {
    let { name, value } = event.target;

    setUpdateInfo({ ...updateInfo, [name]: value });
  };

  function onSubmit() {
    console.log(updateInfo);
    console.log(userData._id);
    console.log(subID);
    findLimitAndUpdate(updateInfo, userData._id, subID).then(() => {
      refreshLimitsData(userData._id);
    });
    reset();
    setIsEditing(false);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="rounded-0 update-input"
          placeholder="Limitas"
          type="number"
          name="limit"
          id="limit"
          step="0.01"
          {...register("limit", {
            required: true,
            pattern: /^(\d){0,8}(\.){0,1}(\d){0,2}$/,

            maxLength: 10,
          })}
          onChange={handleInputChange}
        />
        <Tooltip title="Patvirtinti">
          <button className="btn custom-button-edit" type="submit">
            <AiOutlineCheck color="#3a3845" fontSize="1.5em" />
          </button>
        </Tooltip>
        <Tooltip title="Atšaukti">
          <button
            type="button"
            className="btn  custom-button-tr"
            onClick={() => setIsEditing(false)}
          >
            <AiOutlineClose color="#3a3845" fontSize="1.5em" />
          </button>
        </Tooltip>
      </form>
      {errors.limit && (
        <span className="text-danger fw-light custom-error text-start">
          Būtinas laukas. Ne daugiau 10 simbolių, negali būti neigiamas
          skaičius.
        </span>
      )}
    </div>
  );
}

export default UpdateLimits;
