import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export function AuthProvider({ children, userData }) {
  const [user, setUser] = useLocalStorage("user", userData);
  const navigate = useNavigate();

  const login = (data) => {
    // TODO: Make validations to sent data to server
    setUser(data);
    navigate("/", { replace: true });
  };

  const logout = () => {
    setUser(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
};
