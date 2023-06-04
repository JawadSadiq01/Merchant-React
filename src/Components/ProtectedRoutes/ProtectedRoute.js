import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("user_token");
  console.log("user_token", isAuthenticated);
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
