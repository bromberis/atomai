import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getUserExpensesByMonth,
  getAllUsersData,
  getAllUserExpensesByMonth,
} from "../../api/library/UsersAPI";
import { useGlobalUserContext } from "./UserContext";
const ExpensesContext = createContext();

const ExpensesProvider = ({ children }) => {
  const [expensesThisMonth, setExpensesThisMonth] = useState([]);
  const [userID, setUserID] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [expensesByMonthData, setExpensesByMonthData] = useState([]);

  const { userData } = useGlobalUserContext();

  function getExpUserID() {
    getAllUsersData().then((res) => {
      setUserID(res.data.data.users[0]._id);
      setIsLoading(true);
    });
  }

  if (isLoading) {
    getUserExpensesByMonth(userData._id).then((res) => {
      setExpensesThisMonth(res.data.data.expenses);
    });

    getAllUserExpensesByMonth(userData._id).then((res) => {
      setExpensesByMonthData(res.data.data.expenses);
    });

    setIsLoading(false);
  }

  useEffect(() => {
    getExpUserID();
  }, []);

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
        getExpUserID,
        getUserExpensesByMonth,
        expensesByMonthData,
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
