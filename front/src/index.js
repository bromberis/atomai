import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IncomeExpensesInput from "./components/input/IncomeExpensesInput";
import History from "./components/history/History";
import Statistics from "./components/statistics/Statistics";
import RegistrationLogin from "./components/registrationLogin/RegistrationLogin";
import { IncomeProvider } from "./components/context/IncomeContext";
import { ExpensesProvider } from "./components/context/ExpensesContext";
import { UserProvider } from "./components/context/UserContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <ExpensesProvider>
        <IncomeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />}>
                <Route path="/" element={<RegistrationLogin />} />
                <Route path="/incexp" element={<IncomeExpensesInput />} />
                <Route path="/history" element={<History />} />
                <Route path="/statistics" element={<Statistics />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </IncomeProvider>
      </ExpensesProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
