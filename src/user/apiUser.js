//  This is where we're going to store all the functions related to backend requests
//-------------------------------------------------------------------------------[Requirements]
import { API } from "../config";

//------------------------------------------------------------------------------------[Logic]
//-----------------------------------------------------------{Get User}
export const getUserData = (userId, token) => {
  return fetch(`${API}/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      // console.log(response); returns a response, working fine
      return response.json();
    })
    .catch((err) => console.log(err));
};
//-----------------------------------------------------------{update User}
export const update = (userId, token, user) => {
  const options = {
    method: "PUT",
    headers: {
      // when we make a request, our API will respond with json data, so we make sure we accept application/json
      Accept: "application/json",
      "Content-Type": "application/json", // We also set the Content-Type
      Authorization: `Bearer ${token}`,
    },
    // we send the info about the order to the backend in the order property of the request body
    body: JSON.stringify(user),
  };
  return fetch(`${API}/user/${userId}`, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
//-----------------------------------------------------------{update the user in the local storage}
export const updateUser = (user, next) => {
  // we get the arguments from the parent "Profile component"
  if (typeof window !== "undefined") {
    if (localStorage.getItem("jwt")) {
      // [1] Retrieve from localStorage
      let auth = JSON.parse(localStorage.getItem("jwt"));
      // [2] ammend user to auth
      auth.user = user;
      // [3] update local storage iwth auth
      localStorage.setItem("jwt", JSON.stringify(auth));
      next(); // [4] run callback function to maybe redirect the user after the profile is updated successfully.
    }
  }
};
//-----------------------------------------------------------{get purchase history}
export const getPurchaseHistory = (userId, token) => {
  return fetch(`${API}/orders/by/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      // console.log(response); returns a response, working fine
      return response.json();
    })  
    .catch((err) => console.log(err));
};
