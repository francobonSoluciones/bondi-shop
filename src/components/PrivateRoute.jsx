import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, onlyAdmin = false }) => {
  const { user } = useAuth();
  //console.log("Usuario autenticado:", user);
  if (!user) return <Navigate to="/login" />;
  if (onlyAdmin && user.username !== "admin") return <Navigate to="/" />;
  return children;
};

export default PrivateRoute;
