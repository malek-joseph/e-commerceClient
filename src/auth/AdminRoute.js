import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isAuthenticated } from "../auth/index";

export const AdminRoute = () => {
  const auth = isAuthenticated();
  // console.log(auth);
  if (auth && auth.user.role === 0) {
    return <Navigate to="/" />;
  }
  return auth && auth.user.role === 1 ? <Outlet /> : <Navigate to="/signin" />;
};
