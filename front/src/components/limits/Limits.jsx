import React, { useEffect, useState } from "react";
import { useGlobalCategoriesContext } from "../context/CategoriesContext";
import { useGlobalUserContext } from "../context/UserContext";
import { useGlobalLimitsContext } from "../context/LimitsContext";
import { useForm } from "react-hook-form";
import LimitsTable from "./LimitsTable";
import { createUserLimits } from "../../api/library/UsersAPI";
import "./Limits.css";

function Limits() {
  // useEffect(() => {}, []);
  const { expensesCategories } = useGlobalCategoriesContext();
  const { userData } = useGlobalUserContext();
  const { limits, refreshLimitsData } = useGlobalLimitsContext();
  let { limitsData } = useState([]);

  useEffect(() => {}, [limits]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    createUserLimits(userData._id, data).then(() => {
      refreshLimitsData(userData._id);
    });
    reset();
  }
  if (limits.length > 0) {
    console.log(limits);
    limitsData = limits.map((item) => {
      return (
        <LimitsTable
          key={item._id}
          subID={item._id}
          category={item.category}
          limit={item.limit}
        />
      );
    });
  }

  return (
    <div className="container py-4">
      <div className="row">
        <h3 className="col text-center">Limitai</h3>
        <p className="text-center">
          Čia galite nusistatyti norimus limitus pasirinktoms išlaidų
          kategorijoms.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row justify-content-center">
          <div className="col-lg-4 col-12 p-0 my-2 me-lg-1">
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
                Ši kategorija jau panaudota.
              </span>
            )}
          </div>
          <div className="col-lg-4 col-12 p-0 my-2 me-lg-1">
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
              <span className="text-danger fw-light">
                Būtinas laukas. Ne daugiau 10 simbolių, negali būti neigiamas
                skaičius.
              </span>
            )}
          </div>
          <div className="col-lg-2 col-12 text-center my-2 p-0 me-lg-1">
            <button className="limits-button" type="submit">
              Nustatyti
            </button>
          </div>
        </div>
      </form>
      <div className="pt-4">{limitsData !== undefined && limitsData}</div>
    </div>
  );
}

export default Limits;
