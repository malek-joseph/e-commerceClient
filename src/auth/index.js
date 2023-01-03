import { API } from "../config";

export const signup = (user) => {
  // console.log("signup works");

  // console.log(user);
  // We need to send name, email and password the back-end We can use either Axios or fetch()
  // request info 1st argument
  // console.log(API);
  // request initialization
  const options = {
    method: "POST",
    headers: {
      // when we make a POST request, our API will respond with json data, so we make sure we accept application/json
      Accept: "application/json",
      // We also set the Content-Type
      "Content-Type": "application/json",
    },
    // The body is where the actual data will be, axios uses the data property to transfer data
    // We have to stringify in fetch but it's automatically done in axios, and we stringify the object, since the browser can read strings only
    // JSON.stringify takes a literal object as an argument and returns a string the browser can read
    body: JSON.stringify(user),
  };

  return fetch(`${API}/signup`, options)
    .then((response) => {
      // response.json() takes a response streamand reads till completion. It returns a promise that resolves with the result of parsing the body text as JSON.
      // returns a JSON object
      // console.log("then works");
      return response.json({
        message: "success",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const signin = (user) => {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(user),
  };

  return fetch(`${API}/signin`, options)
    .then((response) => {
      return response.json({
        message: "success",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// we're trying to save the token and user login data, that the backend responded with to the client request, so that it can be used later. We receive the tokn in the newtwork tab and we want to store it in the local storage in the Application tab, the local storage is just a property of the window object

// we get the data as an argument, and then we can call next
// next is a callback function we use it to update the state or redirect the user, etc
export const authenticate = (data, next) => {
  // console.log(data);
  // since the loacl storage is a property of the window obeject, we check if it's not undefined, so that we can access the local storage and add the  key value pairs we want in it using the setItem method.
  if (typeof window !== "undefined") { // we check if the window object is there, because this means we're running the code on a browser
    localStorage.setItem("jwt", JSON.stringify(data)); // we transform data js object, to a string so the browser can read it
    next();
  }
  // in the next callback we created we can redirect the user, and we can update state in it etc...
};

// next is a callback function we use it to update the state or redirect the user, etc
// in signout we have 3 tasks, 1 remove token from local storage. 2 send request to backend. 3 redirect user to signin page.
export const signout = (next) => {
  // 1 remove token from local storage.
  // we check if the localStorage is not empty, by checking the window object.
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt"); // removeItem takes the key and remove it from the localStorage
    next(); // next is a callback function, we will use it to redirect the user.
    // 2 send request to backend. fetch alternatives are axios, which is much better than fetch, and react query, they handle Http requests
    const options = {
      method: "GET",
    };
    return fetch(`${API}/signout`, options)
      .then((response) => {
        // console.log("signed out!", response);
      })
      .catch((err) => console.log(err));
  }

};


// access user from localStorage? so we determine whether a user is authenticated or not.
export const isAuthenticated = () => {
  if (typeof window === 'undefined') { // we check if the JS code is running on a browser, because the window object is not available in node
    return false
  }
  if (localStorage.getItem('jwt')) { // we check if the user is authenticated by cheching if he has a token in the localStorage
    // the jwt will contain the user info and the jason web token generated
    return JSON.parse(localStorage.getItem('jwt')) // we parse the string from the local storage and parse it into JS object
  } else {
    return false
  }
}