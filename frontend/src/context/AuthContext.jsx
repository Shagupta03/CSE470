import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState(null);

  // Initialize from localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedEmail = localStorage.getItem("userEmail");
    if (storedRole) setRole(storedRole);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  // Keep localStorage in sync
  useEffect(() => {
    if (role) localStorage.setItem("role", role);
    else localStorage.removeItem("role");

    if (email) localStorage.setItem("userEmail", email);
    else localStorage.removeItem("userEmail");
  }, [role, email]);

  const logout = () => {
    setRole(null);
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ role, setRole, email, setEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
