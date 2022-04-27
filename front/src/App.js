import "./App.css";
import IncomeExpenses from "./components/IncomeExpenses";
import History from "./components/History";
import NavBar from "./components/NavBar";
import { Outlet, Link } from "react-router-dom";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div>
      <Navigation />
      <Outlet />
      {/* <IncomeExpenses /> */}
      {/* <div className="App">Atomic money app.</div> */}
      {/* <IncomeExpensesDesktop /> */}
      {/* <IncomeExpensesMobile /> */}
      {/* <NavBar.js /> */}
      <IncomeExpenses />
      {/* <Income /> */}
      <History />
    </div>
  );
}

export default App;
