import React, { useContext, useState } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function login() {
    setCurrentUser({
      _id: "fce321",
      username: "Ahmad Anini",
      email: "ahmadanini86@gmail.com",
      photo: "null",
      followers: 55,
    });
  }

  function logout() {
    setCurrentUser(undefined);
  }

  const value = {
    currentUser,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
