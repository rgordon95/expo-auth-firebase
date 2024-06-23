import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  isAuth: false,
  authenticate: (token) => {},
  logout: (id) => {},
  authToken: "",
});

const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [authToken, setAuthToken] = useState();

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = await AsyncStorage.getItem("authToken");
      if (storedToken) {
        setAuthToken(storedToken);
        setIsAuth(!!storedToken);
      }
    };
    checkAuth();
  }, []);

  const authenticate = (token) => {
    setAuthToken(token);
    setIsAuth(!!token);
    AsyncStorage.setItem("authToken", token);
  };

  const logout = () => {
    setIsAuth(false);
    setAuthToken("");
    AsyncStorage.removeItem("authToken");

  };

  return (
    <AuthContext.Provider value={{ isAuth, authenticate, logout, authToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
