import React, { createContext, useState, useContext, useEffect } from "react";
// import { getAllUsersData } from "../../src/api/libraries/apiLibraries"
import { getUserById, loginUser } from "../../api/library/UsersAPI";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  //   const [userLogin, setUserLogin] = useState([]);
  //   const [userID, setUserID] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    let test = localStorage.getItem("user");
    test = JSON.parse(test);
    console.log(test);
    setUserData(JSON.parse(localStorage.getItem("user")));
  }, []);

  function updateUserData(id) {
    getUserById(id).then((res) => {
      setUserData(res.data.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
    });
  }
  function doLogin(data) {
    loginUser(data).then((res) => {
      //setUserData(res);
      console.log(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", JSON.stringify(res.data.token));
    });
  }

  // if (isLoading) {
  //   loginUser(loginData).then((res) => {
  //     console.log(res);
  //     setUserData(res);
  //     localStorage.setItem("user", JSON.stringify(res.data.data.user));
  //     localStorage.setItem("token", JSON.stringify(res.data.data.token));
  //     console.log(JSON.parse(localStorage.user));
  //   });
  //   setIsLoading(false);
  // }

  return (
    <UserContext.Provider
      value={{
        setLoginData,
        loginData,
        setIsLoading,
        setUserData,
        userData,
        doLogin,
        updateUserData,
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
