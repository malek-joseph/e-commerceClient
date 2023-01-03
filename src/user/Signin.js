import React, { useState } from "react";
import Layout from "../core/Layout";
import { Navigate } from "react-router-dom";
import { signin, authenticate } from "../auth"; 
import { isAuthenticated } from '../auth/index';

const Signin = () => {
  const [user, setUser] = useState({
    email: "ahmed@gmail.com",
    password: "Ahmed.123",
    error: "",
    loading: false, // to show loading while the signin is happening
    redirectToReferrer: false // this will be set to true if the user signed-in 
  });

  const { user: authUser } = isAuthenticated()
  
  const { email, password, loading, error, redirectToReferrer } = user;

  const inputChangeHandler = (inputValue) => {
    return (event) => {
      setUser({ ...user, error: false, [inputValue]: event.target.value });
    };
  };

  const submitForm = (event) => {
    event.preventDefault();
    setUser({ ...user, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setUser({ ...user, error: data.error, loading: false }); // that's where we set the user ti 
        } else {
          authenticate(data, ()=> {
            setUser({
            ...user,
            redirectToReferrer: true
          });
          })
        }
      });

  };
  const signinForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            type="email"
            className="form-control"
            onChange={inputChangeHandler("email")}
            value={email}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={inputChangeHandler("password")}
            value={password}
          />
        </div>
        <button onClick={submitForm} className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  };

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };
  const showLoading = () => (
    loading && (<div className="alert alert-info"><h2>Loading</h2></div>)

  );

  const redirectUser = () => {
    if (redirectToReferrer) {
      console.log("redirectToReferrer", redirectToReferrer);
      if (authUser && authUser.role === 1) {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/user/dashboard" />;
      }
    }

    //  shall work only if a normal authenticated user wanted to access admin dashboard from url, he'll be directed to signin, but by doing the below condition we redirect to home page when reaching signin page
    if (isAuthenticated()) {
      return <Navigate to="/" />;
    }
  }

  return (
    <Layout
      title="signin Page"
      description="signin to MERN E-Commerce"
      className="container col-md-8 offset-md-2"
    >
      {showLoading()}
      {showError()}
      {signinForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
