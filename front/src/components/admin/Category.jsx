import React, { useState } from "react";
import { useGlobalCategoriesContext } from "../context/CategoriesContext";
import CategoryTable from "./CategoryTable";
import "./Category.css";

function Category() {
  const { expensesCategories } = useGlobalCategoriesContext();

  const [display, setDisplay] = useState("expenses");

  const categoriesData = expensesCategories.map((item) => {
    return (
      <CategoryTable key={item._id} id={item._id} category={item.category} />
    );
  });

  return (
    <div className="container">
      {" "}
      <div className="row pt-4 row-button d-flex justify-content-end">
        <div className="col-7 col-custom  ">
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
      {display == "income" && <p>Pajamos</p>}
      {display === "expenses" && (
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
          {/* div.col */}
        </div>
      )}
    </div>
  );
}

export default Category;
