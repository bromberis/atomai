import React, { useState } from "react";
import FormMobile from "./FormMobile";

export default function IncomeExpensesMobile() {
  const [display, setDisplay] = useState("income");

  function buttonColor(button) {
    return display == button ? "btn-dark" : "btn-secondary";
  }

  return (
    <div>
      <div>
        <button onClick={() => setDisplay("income")} className={`btn ${buttonColor("income")}`}>
          Pajamos
        </button>
      </div>

      {display == "income" && <FormMobile />}
      <div>
        <button onClick={() => setDisplay("expenses")} className={`btn ${buttonColor("expenses")}`}>
          Islaidos
        </button>
      </div>

      {display == "expenses" && <FormMobile />}
      <div>Balansas: {}</div>
    </div>
  );
}
