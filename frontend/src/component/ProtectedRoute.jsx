import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const role = localStorage.getItem("role");
  if (!role) return <Navigate to="/login" />; // not logged in
  if (role !== allowedRole) return <Navigate to={role === "admin" ? "/admin-dashboard" : "/dashboard"} />;
  return children;
}

export default ProtectedRoute;
