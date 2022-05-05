import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getUserExpensesByMonth,
  getAllUsersData,
} from "../../api/library/UsersAPI";

const ExpensesContext = createContext();

const ExpensesProvider = ({ children }) => {
  const [expensesThisMonth, setExpensesThisMonth] = useState([]);
  const [userID, setUserID] = useState();
  const [isLoading, setIsLoading] = useState(false);

  function getExpUserID() {
    getAllUsersData().then((res) => {
      setUserID(res.data.data.users[0]._id);
      setIsLoading(true);
    });
  }

  if (isLoading) {
    getUserExpensesByMonth(userID).then((res) => {
      setExpensesThisMonth(res.data.data.expenses);
    });
    setIsLoading(false);
  }

  useEffect(() => {
    getExpUserID();
  }, []);

  return (
    <ExpensesContext.Provider
      value={{
        expensesThisMonth,
        userID,
        getExpUserID,
        getUserExpensesByMonth,
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