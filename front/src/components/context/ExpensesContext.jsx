import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getUserExpensesByMonth,
  getAllUsersData,
  getAllUserExpensesByMonth,
  getUserById,
  getUserExpensesThisMonth,
} from "../../api/library/UsersAPI";
import { useGlobalUserContext, UserContext } from "../context/UserContext";
const ExpensesContext = createContext();

const ExpensesProvider = ({ children }) => {
  const [expensesThisMonth, setExpensesThisMonth] = useState([]);
  const [expensesThisMonthByCategory, setExpensesThisMonthByCategory] =
    useState([]);
  const [userID, setUserID] = useState();
  const [expensesByMonthData, setExpensesByMonthData] = useState([]);
  const { userData } = useGlobalUserContext(UserContext);

  useEffect(() => {
    setUserID(userData._id);
  }, [userData]);

  useEffect(() => {
    if (userData != undefined && userData.hasOwnProperty("email")) {
      getUserExpensesByMonth(userData._id).then((res) => {
        setExpensesThisMonth(res.data.data.expenses);
      });

      getAllUserExpensesByMonth(userData._id).then((res) => {
        setExpensesByMonthData(res.data.data.expenses);
      });

      getUserExpensesThisMonth(userData._id).then((res) => {
        setExpensesThisMonthByCategory(res.data.data.expenses);
      });
    }
  }, [userData]);

  // var sortedExp = expensesByMonthData.sort(function (a, b) {
  //   var c = new Date(a.year);
  //   var d = new Date(b.year);
  //   return d - c;
  // });

  return (
    <ExpensesContext.Provider
      value={{
        expensesThisMonth,
        userID,
        getUserExpensesByMonth,
        expensesByMonthData,
        expensesThisMonthByCategory,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export const useGlobalExpensesContext = () => {
  return useContext(ExpensesContext);
};

export { ExpensesContext, ExpensesProvider };
