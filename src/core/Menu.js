import React, { Fragment } from "react";
// withRouter allow us to access props history in React Router v5, but in v6 we now use useLocation to get the pathname that holds the url value
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { signout, isAuthenticated } from "../auth"; // we ommitted "/index" from /auth/index
import { itemTotal } from './cartHelpers'
import '../images/shopping.jpeg'



const isActive = (location, path) => {
  //if the path in the url and in the page we're in match, the relevant menu link highlights
  if (location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};
//React Router v5
// we destruct the history from the props, so here should be props and below accessed props.history
// you can read more about the history object, and the location prop.
// history package is one of the 2 main dependencies for react router
// React Router v6
// We now use useLocation() to give us the location object that we can pass as a first argument in isActive(location, path)
// function, which then we will use to check the active NavLink to color it differently
const Menu = () => {
  // location object
//   {
//   key: 'ac3df4', // not with HashHistory!
//   pathname: '/somewhere',
//   search: '?some=search-string',
//   hash: '#howdy',
//   state: {
//     [userDefined]: true
//   }
// }
  const location = useLocation();
  // console.log(location); 
  const navigate = useNavigate();

 
  return (
    <>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <NavLink className="nav-link" style={isActive(location, "/")} to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            style={isActive(location, "/shop")}
            to="/shop"
          >
            Shop
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            style={isActive(location, "/cart")}
            to="/cart"
          >
            Cart{" "}
            <sup>
              <small className="cart-badge">{itemTotal()}</small>
            </sup>
          </NavLink>
        </li>
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <NavLink
              className="nav-link"
              style={isActive(location, "/user/dashboard")}
              to="/user/dashboard"
            >
              Dashboard
            </NavLink>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <NavLink
              className="nav-link"
              style={isActive(location, "/admin/dashboard")}
              to="/admin/dashboard"
            >
              Dashboard
            </NavLink>
          </li>
        )}
        {!isAuthenticated() && ( // don't forget to execute the function since it's not defined in this file
          <Fragment>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                style={isActive(location, "/signin")}
                to="/signin"
              >
                Signin
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                style={isActive(location, "/signup")}
                to="/signup"
              >
                Signup
              </NavLink>
            </li>
          </Fragment>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            {/* <NavLink
            className="nav-link"
            style={{ cursor: "pointer", color: "#ffffff" }}
            to="/singin"
          >
            Signout
          </NavLink> */}
            {/* Alternative to the above */}
            <span
              className="nav-link"
              style={{ cursor: "pointer", color: "#ffffff" }}
              // we used arrow function to pass a function with argument, and in this argument we have the callback function, where we ..., and to replace 'next' argument in signout function.
              onClick={() => {
                // we call signout from auth/index.js and pass Navigate as a callback function to replace next. to redirect the user to home page
                signout(() => {
                  navigate("/", { replace: true });
                });
              }}
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </>
  );
};

export default Menu;
