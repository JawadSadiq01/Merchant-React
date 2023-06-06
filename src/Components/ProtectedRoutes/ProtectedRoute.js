import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("user_token");
  const userType = localStorage.getItem("user_type");
  console.log("user_token", isAuthenticated);
  return isAuthenticated ? (
    restOfProps.userType == userType ?
      <Component /> :
      <Navigate to={`/${userType}-dashboard`} />
  ) : <Navigate to="/login" />;
}

export default ProtectedRoute;