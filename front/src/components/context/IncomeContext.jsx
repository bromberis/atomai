import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getUserIncomeByMonth,
  getAllUsersData,
  getAllUserIncomeByMonth,
} from "../../api/library/UsersAPI";

const IncomeContext = createContext();

const IncomeProvider = ({ children }) => {
  const [incomeThisMonth, setIncomeThisMonth] = useState([]);
  const [userID, setUserID] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [incomeByMonthData, setIncomeByMonthData] = useState([]);

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

    getAllUserIncomeByMonth(userID).then((res) => {
      setIncomeByMonthData(res.data.data.income);
    });

    setIsLoading(false);
  }

  useEffect(() => {
    getUserID();
  }, []);

  var sortedInc = incomeByMonthData.sort(function (a, b) {
    var c = new Date(a.year);
    var d = new Date(b.year);
    return d - c;
  });

  return (
    <IncomeContext.Provider
      value={{
        incomeThisMonth,
        userID,
        getUserID,
        getUserIncomeByMonth,
        incomeByMonthData,
      }}
    >
      {children}
    </IncomeContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(IncomeContext);
};

export { IncomeContext, IncomeProvider };
