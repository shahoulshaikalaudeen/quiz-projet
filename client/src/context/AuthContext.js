import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, logoutUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (credentials) => {
    const response = await loginUser(credentials);
    if (response.success) {
      setUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user));
    }
    return response;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
