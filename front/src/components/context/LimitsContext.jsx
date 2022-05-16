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
        setLimits(res.data.data.limits);
      });
    }
  }, [userData]);

  useEffect(() => {
    if (userData != undefined && userData.hasOwnProperty("email")) {
      createUserLimits(userData._id, newLimit);
    }
  }, [newLimit]);

  return (
    <LimitsContext.Provider
      value={{
        limits,
        setNewLimit,
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