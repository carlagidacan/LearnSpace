import React, { createContext, useState, useEffect } from "react";
import { setAuthToken } from "../api/apiClient";
import * as authApi from "../api/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("auth");
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed.user || null);
        setToken(parsed.token || null);
        if (parsed.token) setAuthToken(parsed.token);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const login = async (credentials) => {
    const res = await authApi.login(credentials);
    // res assumed { user, token }
    setUser(res.user);
    setToken(res.token);
    setAuthToken(res.token);
    localStorage.setItem("auth", JSON.stringify(res));
    return res;
  };

  const register = async (data) => {
    const res = await authApi.register(data);
    setUser(res.user);
    setToken(res.token);
    setAuthToken(res.token);
    localStorage.setItem("auth", JSON.stringify(res));
    return res;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setAuthToken(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
