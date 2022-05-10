import React, { createContext, useState, useContext, useEffect } from "react";
// import { getAllUsersData } from "../../src/api/libraries/apiLibraries"
import { loginUser } from "../../api/library/UsersAPI";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  //   const [userLogin, setUserLogin] = useState([]);
  //   const [userID, setUserID] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState([]);
  const [userData, setUserData] = useState({});

  //   function getUserInfo() {
  //     getAllUsersData().then((res) => {
  //       setUserID(res.data.data.users[0]._id);
  //       setUserLogin(res.data.data.users)
  //     });
  //   }

  if (isLoading) {
    loginUser(loginData).then((res) => {
      console.log(res);
      setUserData(res);
    });
    setIsLoading(false);
  }

  return (
    <UserContext.Provider
      value={{
        setLoginData,
        loginData,
        setIsLoading,
        setUserData,
        userData,
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
