import "./App.css";
import IncomeExpenses from "./components/IncomeExpenses";
import History from "./components/History";
import { Outlet, Link } from "react-router-dom";
import Navigation from "./components/Navigation";

import IncomeExpensesInput from "./components/IncomeExpensesInput";

function App() {
  return (
    // <div>
    // <div className="container ml-n3">
    <div className="row">
      <div className="col-1 position-fixed">
        <Navigation />
      </div>
      <div className="col-sm-10 offset-sm-1 ">
        <Outlet />
      </div>
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
    </div>
  );
}

export default App;
