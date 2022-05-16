import React from "react";
import { useGlobalCategoriesContext } from "../context/CategoriesContext";
function Limits() {
  const { expensesCategories } = useGlobalCategoriesContext();

  console.log(expensesCategories);
  return (
    <>
      <div className="container pt-3">
        <div className="row">
          <h3 className="col text-center">Limitai</h3>
          <p className="text-center">
            Čia galite nusistatyti norimus limitus pasirinktoms išlaidų
            kategorijoms ir taip sekti savo išlaidas dar patogiau.
          </p>
        </div>
      </div>
    </>
  );
}

export default Limits;

// <select>
//   {studiesData.map((data) => {
//     const { id, program } = data;
//     return (
//       <option key={id} value={program}>
//         {program}
//       </option>
//     );
//   })}
// </select>;
