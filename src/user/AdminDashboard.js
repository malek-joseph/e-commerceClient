import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  // This is what isAuthenticated() returns
  //   {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M…wNDJ9.79lIfdZFzDXRjIyZv_Uh4dsWq8j4oOQjcq0ws-IwITA', user: {…}}
  // token
  // :
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzdkYjYwMDRjN2YwMjlhN2M3ZDhlZTUiLCJpYXQiOjE2NzAwNTgwNDJ9.79lIfdZFzDXRjIyZv_Uh4dsWq8j4oOQjcq0ws-IwITA"
  // user
  // :
  // email
  // :
  // "ahmed@gmail.com"
  // name
  // :
  // "Ahmed"
  // role
  // :
  // 0
  // _id
  // :
  // "637db6004c7f029a7c7d8ee5"
  // [[Prototype]]
  // :
  // Object
  // [[Prototype]]
  // :
  // Object
  //
  const {
    user: { name, email, role },
  } = isAuthenticated(); // we do double destructure
  // console.log(auth);

  const adminLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Admin Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/product">Create Product</Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/orders">View Orders</Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/products ">Manage Products</Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Information.</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {role === 1 ? "admin" : "registered user"}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="AdminDashboard"
      description={`G'day ${name}`}
      className="container"
    >
      <div className="row">
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">{adminInfo()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
