import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Routes, Route, BrowserHistory } from "react-router-dom";
import IncomeExpensesInput from "./components/input/IncomeExpensesInput";
import History from "./components/history/History";
import Statistics from "./components/statistics/Statistics";
import RegistrationLogin from "./components/registrationLogin/RegistrationLogin";
import Limits from "./components/limits/Limits";
import { IncomeProvider } from "./components/context/IncomeContext";
import { ExpensesProvider } from "./components/context/ExpensesContext";
import Admin from "./components/admin/Admin";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { UserProvider } from "./components/context/UserContext";
import { CategoriesProvider } from "./components/context/CategoriesContext";
import { LimitsProvider } from "./components/context/LimitsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <CategoriesProvider>
        <LimitsProvider>
          <ExpensesProvider>
            <IncomeProvider>
              <BrowserRouter>
                <Routes>
                  {/* Private Routes */}
                  <Route element={<ProtectedRoutes />}>
                    <Route element={<App />}>
                      <Route element={<ProtectedRoutes roleRequired="admin" />}>
                        <Route path="/admin" element={<Admin />} />
                      </Route>
                      <Route exact path="/history" element={<History />} />

                      <Route path="/statistics" element={<Statistics />} />
                      <Route path="/limits" element={<Limits />} />

                      <Route path="/incexp" element={<IncomeExpensesInput />} />
                    </Route>
                  </Route>

                  {/* Public Routes */}
                  <Route path="/" element={<App />}>
                    <Route path="/" element={<RegistrationLogin />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </IncomeProvider>
          </ExpensesProvider>
        </LimitsProvider>
      </CategoriesProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
