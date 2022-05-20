import React, { useState } from "react";
import { useGlobalCategoriesContext } from "../context/CategoriesContext";
import { createExpCategory } from "../../api/library/CategoriesAPI";
import { useForm } from "react-hook-form";
import CategoryTable from "./CategoryTable";
import "./Category.css";

function Category() {
  const { expensesCategories } = useGlobalCategoriesContext();
  const { refreshCategoriesData } = useGlobalCategoriesContext();

  const [display, setDisplay] = useState("expenses");

  const categoriesData = expensesCategories.map((item) => {
    return (
      <CategoryTable key={item._id} id={item._id} category={item.category} />
    );
  });
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
    createExpCategory(newObj).then(() => {
      refreshCategoriesData(expensesCategories._id);
    });
    reset();
  }

  return (
    <div className="container">
      {" "}
      <div className="row pt-4 row-button d-flex justify-content-end">
        {/* <div className="col-7 col-custom  ">
          <button
            onClick={() => setDisplay("income")}
            className="income-btn-admin"
          >
            Pajamos
          </button>
          <button
            onClick={() => setDisplay("expenses")}
            className="expenses-btn-admin"
          >
            Išlaidos
          </button>
        </div>
      </div>
      {display == "income" && <p>Pajamos</p>} */}
        {/* {display === "expenses" && ( */}

        <div className="row justify-content-center">
          {" "}
          <div className="col-10">
            <table className="custom-table-admin m-0">
              <thead>
                <tr className="text-center">
                  <th scope="col">Išlaidų kategorijos</th>
                  <th scope="col">Veiksmai</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                <>{categoriesData}</>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-end pt-5 ">
        <div className="col-8 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="rounded-0 input-custom-admin input-custom-add "
              type="text"
              name="category"
              id="category"
              {...register("category", {
                required: true,
                maxLength: 20,
                minLength: 2,
                pattern: /^[A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ\s]+$/i,
                validate: {
                  find: (value) => {
                    let result = expensesCategories.map((a) =>
                      UppercaseFirst(a.category)
                    );
                    return !result.includes(UppercaseFirst(value));
                  },
                },
              })}
            />

            <button className=" custom-button-submit " type="submit">
              Pridėti naują kategoriją
            </button>
          </form>
        </div>
        {errors.category && (
          <div className="text-danger fw-light text-center">
            2-20 simbolių, tik raidės. Kategorija negali kartotis.
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;
