import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Tooltip from "@mui/material/Tooltip";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { updateExpCategory } from "../../api/library/CategoriesAPI";
import { useGlobalCategoriesContext } from "../context/CategoriesContext";

function UpdateCategory(props) {
  const { expensesCategories, refreshCategoriesData } =
    useGlobalCategoriesContext();

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
        className="rounded-0 input-custom-admin "
        type="text"
        name="category"
        id="category"
        defaultValue={category}
        {...register("category", {
          required: true,
          maxLength: 20,
          minLength: 2,
          pattern:
            /^[a-ząčęėįšųūž|A-ZĄČĘĖĮŠŲŪŽ]+(?: [a-ząčęėįšųūž|A-ZĄČĘĖĮŠŲŪŽ]+)*$/,
          validate: {
            find: (value) => {
              let result = expensesCategories.map((a) =>
                a.category.toUpperCase()
              );
              return !result.includes(value.toUpperCase());
            },
          },
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
        <div className="text-danger fw-light">
          2-20 simbolių, tik raidės. Kategorija negali kartotis.
        </div>
      )}
    </form>
  );
}

export default UpdateCategory;
