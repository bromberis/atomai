import React, { createContext, useState, useContext, useEffect } from "react";
import { getUserIncomeByMonth, getAllUsersData, getAllUserIncomeByMonth } from "../../api/library/UsersAPI";
import { useGlobalUserContext, UserContext } from "../context/UserContext";

const IncomeContext = createContext();

const IncomeProvider = ({ children }) => {
  const [incomeThisMonth, setIncomeThisMonth] = useState([]);
  const [userID, setUserID] = useState();

  const [incomeByMonthData, setIncomeByMonthData] = useState([]);

  const { userData } = useGlobalUserContext(UserContext);

  useEffect(() => {
    setUserID(userData._id);
  }, [userData]);

  useEffect(() => {
    if (userData != undefined && userData.hasOwnProperty("email")) {
      getUserIncomeByMonth(userData._id).then((res) => {
        setIncomeThisMonth(res.data.data.income);
      });

      getAllUserIncomeByMonth(userData._id).then((res) => {
        setIncomeByMonthData(res.data.data.income);
      });
    }
  }, [userData]);

  // var sortedInc = incomeByMonthData.sort(function (a, b) {
  //   var c = new Date(a.year);
  //   var d = new Date(b.year);
  //   return d - c;
  // });

  return (
    <IncomeContext.Provider
      value={{
        incomeThisMonth,
        userID,

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
