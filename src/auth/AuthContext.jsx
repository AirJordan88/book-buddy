/** Role A
 * AuthContext manages the user's authentication state by storing a token,
 * It provides functions for the user to register, log in, and log out,
 * all of which update the token in state.
 */

import { useState, createContext, useContext, useEffect } from "react";
import { API } from "../api/Users";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // token to verify a user
  const [token, setToken] = useState(localStorage.getItem("token"));

  // state to manage register
  const register = async (credentials) => {
    const response = await fetch(API + "/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const result = await response.json();
    if (!response.ok) {
      throw Error(result.message);
    }
    setToken(result.token);
  };

  /** manages login states
   * keeps token in state
   */
  const login = async (credentials) => {
    const response = await fetch(API + "/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const result = await response.json();
    if (!response.ok) {
      throw Error(result.message);
    }
    setToken(result.token);
  };

  /** stores token in localStorage */
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  /** asks  users: are we logged in? */
  const isLoggedIn = !!token;

  /** logout sets token to empty */
  const logout = () => setToken(null);

  /** allow children to use this */
  const value = { token, register, login, isLoggedIn, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within AuthProvider");
  return context;
}
