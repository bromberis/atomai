import "./App.css";
import IncomeExpenses from "./components/IncomeExpenses";
import History from "./components/History";

import NavBar from "./components/NavBar";

import IncomeExpensesInput from "./components/IncomeExpensesInput";

function App() {
  return (
    <div>
      {" "}
      {/* <IncomeExpenses /> */}
      {/* <div className="App">Atomic money app.</div> */}
      {/* <IncomeExpensesDesktop /> */}
      {/* <IncomeExpensesMobile /> */}
      {/* <NavBar.js /> */}
      <IncomeExpenses />
      {/* <IncomeExpenses /> */}
      {/* <Income /> */}
      <IncomeExpensesInput />
      <History />
    </div>
  );
}

export default App;
