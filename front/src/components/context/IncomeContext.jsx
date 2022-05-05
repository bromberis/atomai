import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getUserIncomeByMonth,
  getAllUsersData,
} from "../../api/library/UsersAPI";

const IncomeContext = createContext();

const IncomeProvider = ({ children }) => {
  const [incomeThisMonth, setIncomeThisMonth] = useState([]);
  const [userID, setUserID] = useState();
  const [isLoading, setIsLoading] = useState(false);

  function getUserID() {
    getAllUsersData().then((res) => {
      setUserID(res.data.data.users[0]._id);
      setIsLoading(true);
    });
  }

  if (isLoading) {
    getUserIncomeByMonth(userID).then((res) => {
      setIncomeThisMonth(res.data.data.income);
    });
    setIsLoading(false);
  }

  useEffect(() => {
    getUserID();
  }, []);

  return (
    <IncomeContext.Provider
      value={{ incomeThisMonth, userID, getUserID, getUserIncomeByMonth }}
    >
      {children}
    </IncomeContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(IncomeContext);
};

export { IncomeContext, IncomeProvider };
