import React from "react";
//The BrowserRouter is what makes the props available for the sub-components
// Switch was used instead of routes in React Router v 5
import { Routes, Route } from "react-router-dom";

import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";

import { PrivateRoute } from "./auth/PrivateRoute";
import Dashboard from "./user/UserDashboard";
import Profile from "./user/Profile";

import { AdminRoute } from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';

import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import ManageProducts from "./admin/ManageProducts";
import Orders from "./admin/Orders";
import UpdateProduct from './admin/UpdateProduct';
 
const App = () => {
  return (
    <React.Fragment>
      <Routes>
        {/* <Route path="/signin" exact component={Signin} /> in React Router v5 */}
        {/* in React Router v6 */}
        {/* We don't have to use exact anymore in v6 of react-router */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        {/* how nested routes are done in v6 */}
        <Route element={<PrivateRoute />}>
          <Route path="/user/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/create/category" element={<AddCategory />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/create/product" element={<AddProduct />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/admin/orders" element={<Orders />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/admin/products" element={<ManageProducts />} />
        </Route>

        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile/:userId" element={<Profile />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/admin/product/update/:productId" element={<UpdateProduct />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default App;
