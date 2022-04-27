import React, { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import IncomeExpensesMobile from "./IncomeExpensesMobile";
import IncomeExpensesDesktop from "./IncomeExpensesDesktop";
import Navigation from "./Navigation";

export default function IncomeExpenses() {
  const [width, setWidth] = useState(window.innerWidth);

  function handleResize(test) {
    setWidth(window.innerWidth);
  }

  const handler = useCallback(debounce(handleResize, 200), []);

  window.addEventListener("resize", () => handler("test"));

  console.log(window.innerWidth);
  return (
    <div>
      {/* <div>
        <Navigation />
      </div>{" "} */}
      {width < 600 ? <IncomeExpensesMobile /> : <IncomeExpensesDesktop />}
    </div>
  );
}
