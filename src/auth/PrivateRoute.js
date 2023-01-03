import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isAuthenticated } from "../auth/index";



export const PrivateRoute = () => {

  const auth = isAuthenticated()
  // console.log(auth);
  return auth ? <Outlet /> : <Navigate  to="/signin" />;
};

