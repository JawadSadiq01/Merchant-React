import React from "react";
// import { Navigate, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  // console.log("this", isAuthenticated);
  // return isAuthenticated ? <Component /> : <Navigate to="/" />;
  return isAuthenticated ? <Component /> : <Component />;
}

export default ProtectedRoute;
