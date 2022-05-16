import React, { createContext, useState, useContext, useEffect } from "react";

import { getAllExpCategories } from "../../api/library/CategoriesAPI";
import { useGlobalUserContext, UserContext } from "../context/UserContext";

const CategoriesContext = createContext();

const CategoriesProvider = ({ children }) => {
  const [expensesCategories, setExpensesCategories] = useState([]);
  const { userData } = useGlobalUserContext(UserContext);

  useEffect(() => {
    if (userData != undefined && userData.hasOwnProperty("email")) {
      getAllExpCategories().then((res) => {
        setExpensesCategories(res.data.data.categories);
      });
    }
  }, [userData]);

  return (
    <CategoriesContext.Provider
      value={{
        expensesCategories,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useGlobalCategoriesContext = () => {
  return useContext(CategoriesContext);
};

export { CategoriesContext, CategoriesProvider };
