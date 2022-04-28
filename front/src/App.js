import React, { useState, useCallback } from "react";
import "./App.css";
import IncomeExpenses from "./components/IncomeExpenses";
import History from "./components/History";
import { Outlet, Link } from "react-router-dom";
import Navigation from "./components/Navigation";
import NavigationMobile from "./components/NavigationMobile";
import IncomeExpensesInput from "./components/IncomeExpensesInput";
import { debounce } from "lodash";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  function handleResize() {
    setWidth(window.innerWidth);
  }
  const handler = useCallback(debounce(handleResize, 100), []);
  window.addEventListener("resize", () => handler());

  return (
    <>
      {width > 768 ? (
        <>
          <div className="row">
            <div className="col-2 p-0 ">
              <Navigation />
            </div>

            <div className="col-10 ">
              <Outlet />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="row">
            <div className="col-12 p-0 ">
              <NavigationMobile />
            </div>
            <div className="col-12">
              <Outlet />
            </div>
          </div>
        </>
      )}

      {/* </div> */}
      {/* </div> */}

      {/* <IncomeExpenses /> */}
      {/* <div className="App">Atomic money app.</div> */}
      {/* <IncomeExpensesDesktop /> */}
      {/* <IncomeExpensesMobile /> */}
      {/* <NavBar.js /> */}
      {/* <IncomeExpenses /> */}
      {/* <IncomeExpenses /> */}
      {/* <Income /> */}
      {/* <IncomeExpensesInput />
      <History /> */}
    </>
  );
}

export default App;
