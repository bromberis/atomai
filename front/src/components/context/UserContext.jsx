import React, { createContext, useState, useContext, useEffect } from "react";
import { Navigat, useNavigate } from "react-router-dom";
// import { getAllUsersData } from "../../src/api/libraries/apiLibraries"
import { getUserById, loginUser } from "../../api/library/UsersAPI";
import CsvDownload from "react-json-to-csv";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (localStorage.user !== undefined) {
      setUserData(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  function updateUserData(id) {
    getUserById(id).then((res) => {
      setUserData(res.data.data.users);
      localStorage.setItem("user", JSON.stringify(res.data.data.users));
    });
  }
  async function doLogin(data) {
    loginUser(data).then((res) => {
      setUserData(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", JSON.stringify(res.data.token));
      return res;
    });
  }

  function signOut() {
    setUserData({});
    localStorage.clear();
  }
  function exportJSON() {
    console.log(userData);

    console.log(`testes`);
  }

  return (
    <UserContext.Provider
      value={{
        setUserData,
        userData,
        doLogin,
        updateUserData,
        signOut,
        exportJSON,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useGlobalUserContext = () => {
  return useContext(UserContext);
};

export { UserContext, UserProvider };
