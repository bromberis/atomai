import React, { createContext, useState, useContext, useEffect } from "react";
// import { getAllUsersData } from "../../src/api/libraries/apiLibraries"

const UserContext = createContext();

const UserProvider = ({ children }) => {
  //   const [userLogin, setUserLogin] = useState([]);
  //   const [userID, setUserID] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState([]);

  //   function getUserInfo() {
  //     getAllUsersData().then((res) => {
  //       setUserID(res.data.data.users[0]._id);
  //       setUserLogin(res.data.data.users)
  //     });
  //   }

  //   if (isLoading) {
  //     loginUser(loginData);
  //     setIsLoading(false);
  //   }

  return (
    <UserContext.Provider
      value={{
        setLoginData,
        loginData,
        setIsLoading,
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
