import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
  const [name, setName] = useState(``);
  // take care if you used the initial state boolean, don't put it in ''
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  // We receive the user object by destructuring it from the isAuthenticated() function
  // destructure the user and the token from the localStorage
  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };
  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(true);
    setTimeout(() => {
    setSuccess(false);
      
    }, 1000);

    // Make a request to the backend API to create the category
    // we pass the category object as 3rd argument, which needs only a name prop
    // since createCategory will make a request to the backend, we need to set error handling then catch block.
    createCategory(user._id, token, { name: name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
      }
    });

  };

  const newCategoryForm = () => {
    return (
      // be carefull and use onSubmit not on Click, because this will miss the form
      <form onSubmit={clickSubmit}>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            className="form-control"
            type="text"
            autoFocus // highlights the input automatically when the page is loaded
            // that's how we pick up the value from the input on change e.target.value, and then set the state to the value of the input
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        {/* The outline property makes the borders and the text colored primary, and inverted to white when hovered over*/}
        <button className="btn btn-outline-primary">Create Category!</button>
      </form>
    );
  };

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">{name} is created</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return (
        <h3 className="text-danger">
          The name of the category should be unique!
        </h3>
      );
    }
  };

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Go back to Dashboard
      </Link>
    </div>
  );
  return (
    <Layout
      title="Add Category"
      description={`G'day ${user.name}, we're ready to add a new category!`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
