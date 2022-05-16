import React, { createContext, useState, useContext, useEffect } from "react";

import { getAllUserLimits, createUserLimits } from "../../api/library/UsersAPI";
import { useGlobalUserContext, UserContext } from "../context/UserContext";

const LimitsContext = createContext();

const LimitsProvider = ({ children }) => {
  const [limits, setLimits] = useState({});
  const [newLimit, setNewLimit] = useState({});

  const { userData } = useGlobalUserContext(UserContext);

  useEffect(() => {
    if (userData != undefined && userData.hasOwnProperty("email")) {
      getAllUserLimits(userData._id).then((res) => {
        console.log(res.data.data.limits);
        setLimits(res.data.data.limits);
      });
    }
  }, [userData]);

  function refreshLimitsData(id) {
    getAllUserLimits(id).then((res) => {
      console.log(res.data.data.limits);
      setLimits(res.data.data.limits);
    });
  }

  // useEffect(() => {
  //   if (userData != undefined && userData.hasOwnProperty("email")) {

  //     refreshLimitsData(userData._id);
  //   }
  // }, []);

  return (
    <LimitsContext.Provider
      value={{
        limits,
        setNewLimit,
        getAllUserLimits,
        refreshLimitsData,
      }}
    >
      {children}
    </LimitsContext.Provider>
  );
};

export const useGlobalLimitsContext = () => {
  return useContext(LimitsContext);
};

export { LimitsContext, LimitsProvider };
