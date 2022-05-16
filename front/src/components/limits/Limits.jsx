import React, { useState } from "react";
import { useGlobalCategoriesContext } from "../context/CategoriesContext";
import { useGlobalUserContext } from "../context/UserContext";
import { useGlobalLimitsContext } from "../context/LimitsContext";
import { useForm } from "react-hook-form";

function Limits() {
  const { expensesCategories } = useGlobalCategoriesContext();
  const { userData } = useGlobalUserContext();
  const { limits, setNewLimit } = useGlobalLimitsContext();

  console.log(limits);

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    setNewLimit(data);
  }

  return (
    <div className="container pt-3">
      <div className="row">
        <h3 className="col text-center">Limitai</h3>
        <p className="text-center">
          Čia galite nusistatyti norimus limitus pasirinktoms išlaidų
          kategorijoms.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-lg-5 col-12 p-2">
            <select
              {...register("category", {
                required: true,
                validate: {
                  find: (value) => {
                    let result = limits.map((a) => a.category);
                    return !result.includes(value);
                  },
                },
              })}
            >
              {expensesCategories.map((data) => {
                const { _id, category } = data;
                return (
                  <option key={_id} value={category}>
                    {category}
                  </option>
                );
              })}
            </select>
            {errors.category && errors.category !== "find" && (
              <span className="text-danger fw-light">
                Tokia kategorija jau buvo pasirinkta.
              </span>
            )}
          </div>
          <div className="col-lg-5 col-12 p-2">
            <input
              className="rounded-0 "
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
            />
            {errors.limit && (
              <span className="text-danger fw-light">Būtinas laukas.</span>
            )}
          </div>
          <div className="col-lg-2 col-12 Registration-button p-2">
            <button type="submit">Nustatyti</button>
          </div>
        </div>
      </form>
      <div className="row">
        <div className="col">{JSON.stringify(limits)}</div>
      </div>
    </div>
  );
}

export default Limits;
