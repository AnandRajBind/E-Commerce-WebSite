 import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("user");
    setIsLoggedIn(!!token);
  }, []);

  const login = (token) => {
    localStorage.setItem("user", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
