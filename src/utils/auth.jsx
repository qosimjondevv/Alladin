import { createContext, useContext, useState } from "react";
import { getUser, setUser as saveUser, removeUser } from "./storage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(() => getUser());

  const login = (name, password) => {
    const data = { name, password, img: null, ageGroup: "Дети" };
    saveUser(data);
    setUserState(data);
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    saveUser(updated);
    setUserState(updated);
  };

  const logout = () => {
    removeUser();
    setUserState(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      login,
      logout,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};