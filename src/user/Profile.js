import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Navigate } from "react-router-dom";
import { update, getUserData, updateUser } from "./apiUser";

const Profile = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false,
  });
  const userId = useParams();

  const { token } = isAuthenticated();
  const { name, email, password, error, success } = values;

  useEffect(() => {
    init(); // userId is needed to update, we get it in the url params, and we retrieve it his way.
  }, []);

  const init = () => {
    // console.log(userId); 
    getUserData(userId, token).then((data) => {
      if (data.error) {
        // console.log("error", data); runs with the error 'user not found'
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    update(userId, token, { name, email, password }).then((data) => {
      if (data.error) {
        // console.log(data.error);
        alert(data.error);
      } else {
        updateUser(data, () => {
          setValues({
            ...values,
            name: data.name,
            email: data.email,
            success: true,
          });
        });
      }
    });
  };

  const redirectUser = (success) => {
    if (success) {
      return <Navigate to="/cart" />;
    }
  };
  const profileUpdate = (name, email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          onChange={handleChange("name")}
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          onChange={handleChange("email")}
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          onChange={handleChange("password")}
          className="form-control"
          value={password}
        />
      </div>

      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );
  return (
    <Layout
      title="Profile"
      className="container-fluid"
      description="update your profile"
    >
      <h2 className="mb-4">Profile Update</h2>
      {/* {JSON.stringify(values)} */}
      {profileUpdate(name, email, password)}
      {redirectUser(success )}
    </Layout>
  );
};

export default Profile;
