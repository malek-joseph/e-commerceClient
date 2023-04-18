import React, { useState } from "react";
import Layout from "../core/Layout";
import {Link} from 'react-router-dom'
import {signup} from '../auth' // we import from /index.js, but since it's index we can ommit it

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  // We want to destructure the values of the user from the state to use it in the submit handler when the button is clicked
  const { name, email, password, success, error } = user;

  // inputChangeHandler  is High order function/ HOC, it's a function that returns a function
  const inputChangeHandler = (inputValue) => {
    return (event) => {
      // By manipulating the user state, and adding the target.value in the state, so that it can be later used in the app
      // notce using the spread operator, when we set a value to a constant property like error, we don't use [error] but if we don't know the name of the property "variable property", like the input, which might change between name, email and password, we wrap it in []
      setUser({ ...user, error: false, [inputValue]: event.target.value });
    };
  };

 

  const submitForm = (event) => {
    // We run this method to prevent the default reload of the browser when the button is clicked
    event.preventDefault();
    // before we submit again we need to set the error to false. so that it can get it's validity from the new signup
    setUser({...user, error: false})
    //  And then we grab the data of the inputs from the state, to send it eventually to the back-end
    signup({ name, email, password })
      // since signup filles data in an asynchronous function, then we can deal with it with then catch
      // That was one of the cons of then catch of ES6 and what's why we use async await now to handle asyncronous code, it's more readable
      .then((data) => {
        if (data.error) {
          // Check if error message contains the string '11000' and 'duplicate key'
          if (data.error.includes('11000') && data.error.includes('duplicate key')) {
            setUser({ ...user, error: `This email already exists, maybe try to login`, success: false });
          } else {
            setUser({ ...user, error: data.error, success: false });
          }
        } else {
          setUser({ ...user, name: '', email: '', password: '', error: '', success: true });
        }
      });

    // console.log("Form works!");
  };
  const signupForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={inputChangeHandler("name")}
            // the value of the input is set by react, it's called controlled component
            value={name} // we explicitly assign the value of the input stored in the state to the input
          />
        </div>
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
    // using bootstrap classes >> we remove the error if there was no error by using diplay none, and if there's error we use '' for displaying
    // We need to destructure error from the state
    return(<div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
      {error}
    </div>)
 
  }
   const showSuccess = () => (
     // using bootstrap classes >> we remove the error if there was no error by using diplay none, and if there's error we use '' for displaying
     // We need to destructure error from the state
     <div
       className="alert alert-info"
       style={{ display: success ? "" : "none" }}
     >
       New account has been created please <Link to='/signin'>SignIn</Link>!
     </div>
   );
  return (
    // The attributes of the Layout component will be sent as props Layout component, container col-8 and offset-2 = 12 geid and   centers the form
    <Layout
      title="signup Page"
      description="signup to MERN E-Commerce"
      className="container col-md-8 offset-md-2"
    >
      {/* WE CAN NAME process.env variables with _ not - in between, - will cause a problem */}
      {/* {API} */}
      {showSuccess()}
      {showError()}
      {signupForm()}
      {/* JSON.stringify is a method that converts a JavaScript object into a string. One use of the method is to store the object as a string in a database, and then convert back to an object when obtaining it.  */}
      {/* {JSON.stringify(user)} */}
    </Layout>
  );
};

export default Signup;
