import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Tooltip from "@mui/material/Tooltip";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { updateExpCategory } from "../../api/library/CategoriesAPI";
import { useGlobalCategoriesContext } from "../context/CategoriesContext";

function UpdateCategory(props) {
  const { refreshCategoriesData } = useGlobalCategoriesContext();

  const { setIsEditing, id, category } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  let UppercaseFirst = (str) => {
    let newStr = str.charAt(0).toUpperCase() + str.slice(1);
    return newStr;
  };

  function onSubmit(data) {
    const newObj = { category: UppercaseFirst(data.category) };

    updateExpCategory(id, newObj).then(() => {
      refreshCategoriesData(id);
    });
    setIsEditing(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        className="rounded-0  "
        type="text"
        name="category"
        id="category"
        defaultValue={category}
        {...register("category", {
          required: true,
          maxLength: 20,
          minLength: 2,
          pattern: /^[A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ\s]+$/i,
        })}
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
      {errors.category && (
        <div className="text-danger fw-light">2-20 simbolių, tik raidės.</div>
      )}
    </form>
  );
}

export default UpdateCategory;
