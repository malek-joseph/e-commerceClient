//  This is where we're going to store all the functions related to backend requests
// 1 we want to send the category that we've created earlier and passed as props to the createCategory backend function
import { API } from "../config";

export const createCategory = (userId, token, category) => {
  const url = `${API}/category/create/${userId}`;
  const options = {
    method: "POST",
    headers: {
      // when we make a POST request, our API will respond with json data, so we make sure we accept application/json
      Accept: "application/json",
      "Content-Type": "application/json", // We also set the Content-Type
      Authorization: `Bearer ${token}`, // that's how we sent the authorization token to allow as to act as admin
    },
    body: JSON.stringify(category),
  };
  return fetch(url, options)
    .then((response) => {
      return response.json({
        message: "success",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createProduct = (userId, token, product) => {
  const url = `${API}/product/create/${userId}`;
  const options = {
    method: "POST",
    headers: {
      // when we make a POST request, our API will respond with json data, so we make sure we accept application/json
      Accept: "application/json",
      // We don't use Content type here, because we'll not be sending json data, we are sending form data
      // "Content-Type": "application/json", // We also set the Content-Type
      Authorization: `Bearer ${token}`, // that's how we sent the authorization token to allow as to act as admin
    },
    body: product // the form data
  };
  return fetch(url, options)
    .then((response) => {
      return response.json({
        message: "success",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCategories = () => {
  const options = {
    method: 'GET'
  }
  return fetch(`${API}/categories`, options)
    .then(response => response.json())
  .catch(error =>  console.log(error))

}

 
export const listOrders = (userId, token) => {
  const options = {
    method: "GET",
    headers: { 
      // when we make a POST request, our API will respond with json data, so we make sure we accept application/json
      Accept: "application/json",
      "Content-Type": "application/json", // We also set the Content-Type
      Authorization: `Bearer ${token}`, // that's how we sent the authorization token to allow as to act as admin
    },
  };
  return fetch(`${API}/order/list/${userId}`, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
export const getStatusValues  = (userId, token) => {
  const options = {
    method: "GET",
    headers: { 
      // when we make a POST request, our API will respond with json data, so we make sure we accept application/json
      Accept: "application/json",
      "Content-Type": "application/json", // We also set the Content-Type
      Authorization: `Bearer ${token}`, // that's how we sent the authorization token to allow as to act as admin
    },
  };
  return fetch(`${API}/order/status-values/${userId}`, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

// we use this method in orders to update the status of an order
export const updateOrderStatus  = (userId, token, orderId, status) => {
  const options = {
    method: "PUT",
    headers: { 
      // when we make a POST request, our API will respond with json data, so we make sure we accept application/json
      Accept: "application/json",
      "Content-Type": "application/json", // We also set the Content-Type
      Authorization: `Bearer ${token}`, // that's how we sent the authorization token to allow as to act as admin
    },
    body: JSON.stringify({status, orderId})
  };
  return fetch(`${API}/order/${orderId}/status/${userId}`, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};


//--------------------------------------------------[Perform CRUD]

//--------------------------------------------------get All products
export const getProducts = () => {
  // we can manipulate the number of the displayed products in the url
  return fetch(`${API}/products?limit=undefined`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
//--------------------------------------------------get a single Product
export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
//--------------------------------------------------update a single Product
export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
//--------------------------------------------------delete a single Product 

export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};