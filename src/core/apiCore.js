
//  This is where we're going to store all the functions related to backend requests
//-------------------------------------------------------------------------------[Requirements]
import { API } from "../config";
// queryString helps in amending the params in the url string
import queryString from "query-string"; 
//------------------------------------------------------------------------------------[Logic]
//-----------------------------------------------------------{Get Products}
export const getProducts = (sortBy) => {
  const options = {
    method: "GET",
  };
  return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
//-----------------------------------------------------------{Get Categories}
// It's the same function from apiAdmin, we just duplicated it here to be easier to use.
export const getCategories = () => {
  const options = {
    method: "GET",
  };
  return fetch(`${API}/categories`, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
//-----------------------------------------------------------{Filter}
export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = {
    skip,
    limit,
    filters,
  };
  const url = `${API}/products/by/search`;
  const options = {
    method: "POST",
    headers: {
      // when we make a POST request, our API will respond with json data, so we make sure we accept application/json
      Accept: "application/json",
      "Content-Type": "application/json", // We also set the Content-Type
    },
    body: JSON.stringify(data),
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
//-----------------------------------------------------------{Search}
// get products from the backend according to the search results and the filtered categry
// We'll send the category id and the search input in the params so that the user can see the criteria he's searching according to.
export const list = (params) => {
  const query = queryString.stringify(params);
// console.log(params); works
  const options = {
    method: "GET"
  };
  return fetch(`${API}/products/search?${query}`, options)
    .then((response) => {
    console.log(response);
    return response.json()
    }
    )
    .catch((error) => console.log(error));
};
//-----------------------------------------------------------{Get product's details}
// To read product's details 
export const read = (productId) => {
  const options = {
    method: "GET",
  };
  return fetch(`${API}/product/${productId}`, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
//-----------------------------------------------------------{List Related Products}
// To list the relate products in the product view page, we export this to the product component, where we'll use it and send the productId as props
export const listRelated = (productId) => {
  const options = {
    method: "GET",
  };
  return fetch(`${API}/products/related/${productId}`, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
//----------------------------------------------------------{Get Client Token}
// [Get client token from the backend] && [use in Checkout]
export const getBraintreeClientToken = (userId, token) => {
  const options = {
    method: "GET",
    headers: {        
      // when we make a request, our API will respond with json data, so we make sure we accept application/json
      Accept: "application/json",
      "Content-Type": "application/json", // We also set the Content-Type
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(`${API}/braintree/getToken/${userId}`, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
//-------------------------------------------{Process the Payment}
// [Send client token to the backend] && [use in Checkout]
// payment data is the card details and the total amount to be charged
export const processPayment = (userId, token, paymentData) => {
  const options = {
    method: "POST",
    headers: {        
      // when we make a request, our API will respond with json data, so we make sure we accept application/json
      Accept: "application/json",
      "Content-Type": "application/json", // We also set the Content-Type
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymentData)
  };
  return fetch(`${API}/braintree/payment/${userId}`, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
//-----------------------------------------------------------{Create the Order}

export const createOrder = (userId, token, createOrderData) => {
  const options = {
    method: "POST",
    headers: {
      // when we make a request, our API will respond with json data, so we make sure we accept application/json
      Accept: "application/json",
      "Content-Type": "application/json", // We also set the Content-Type
      Authorization: `Bearer ${token}`,
    },
    // we send the info about the order to the backend in the order property of the request body
    body: JSON.stringify({order: createOrderData}),
  };
  return fetch(`${API}/order/create/${userId}`, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
