//-------------------------------------------------------------------------------[Requirements]
//----------------------------------------------------------------{React Core}
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
//----------------------------------------------------------------{Authentication}
import { isAuthenticated } from "../auth";
//----------------------------------------------------------------{backend functions imports}
import {
  getBraintreeClientToken,
  processPayment,
  createOrder,
} from "./apiCore";
//----------------------------------------------------------------{3rd party tools}
import DropIn from "braintree-web-drop-in-react";
//----------------------------------------------------------------{localStorage method}
import { emptyCart } from "./cartHelpers";
//------------------------------------------------------------------------------------[Component Logic]
const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  //----------------------------------------------------------------{State}
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });
  //----------------------------------------------------------------{get userId >> used to get Client Token}
  // [connect to backend to get clientToken]
  //[requirements]
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;
  //----------------------------------------------------------------{Get Client Token >> use in Checkout}
  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        // console.log(data);
        setData({ ...data, error: data.error });
      } else {
        // we could've used ...data, but it will cause conflict with the data in state, so we had to either change the name of data in state,
        //or not spread data to update the clientToken, and we can instead update the client token immediately.
        setData({ clientToken: data.clientToken });
      }
    });
  };
  //----------------------------------------------------------------{useEffect >> render mounted component}
  useEffect(() => {
    getToken(userId, token);
  }, []);
  //----------------------------------------------------------------{Handle address input}
  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

  //----------------------------------------------------------------{Get total price to checkout >> to show total and pay}
  const getTotal = () => {
    // 0 + the accomulator is the sum of [each product count * product price] and returns the accomulator: check .reduce() in JS sheet
    return products.reduce((accomulator, currentValue) => {
      return accomulator + currentValue.count * currentValue.price;
    }, 0);
  };
  //----------------------------------------------------------------{Checkout structure }
  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <NavLink to="/signin">
        <button className="btn btn-primary">Sign in to Checkout</button>
      </NavLink>
    );
  };
  //----------------------------------------------------------------{Handle Payment logic }
  let deliveryAddress = data.address // we define it outside buy() to avoid naming conflict "data" from state and data from resolved promise
  const buy = () => {
    setData({ loading: true });
    // We try to get nonce aka "Card details" and the total to be charged, and send it to the backend.
    let nonce;
    // we receive it from the backend, by accessing the body and getting the nonce from .paymentMethodNonce
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        // console.log(data);
        nonce = data.nonce;
        // console.log(
        //   "send nonce and total to process:",
        //   nonce,
        //   getTotal(products)
        // );
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };
        processPayment(userId, token, paymentData)
          .then((response) => {
            // console.log(response)
            // [1] Create order
            const createOrderData = {
              products: products, // we get products in the props
              transaction_id: response.transaction.id, // you can log response to check its content
              amount: response.transaction.amount,
              address: deliveryAddress, // we need it to know the delivery address
            };
            createOrder(userId, token, createOrderData).then((response) => {
              // [3] Empty Cart by clearing the localStorage
              emptyCart(() => {
                setRun(!run); // run useEffect in parent Cart
                console.log("Payment was processed and the cart was emptied.");
                setData({ loading: false, success: true });
              });
            });
          })
          .catch((error) => {
            console.log(error);
            setData({ loading: false });
          });
      })
      .catch((error) => {
        // console.log("dropin error:", error);
        setData({ ...data, error: error.message });
      });
  };
  //----------------------------------------------------------------{DropIn structure: 3rd party >> use in Checkout }
  const showDropIn = () => (
    // on blur is used to remove the error alert when we blur
    <div
      onBlur={() => {
        setData({ ...data, error: "" });
      }}
    >
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <div className="form-group mb-3">
            <label className="text-muted">Delivery address:</label>
            <textarea
              onChange={handleAddress}
              className="form-control"
              value={data.address}
              placeholder="Type your delivery address here"
            />
          </div>
          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: 'vault',
              },
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button onClick={buy} className="btn btn-success btn-block">
            Pay
          </button>
        </div>
      ) : null}
    </div>
  );
  //----------------------------------------------------------------{to show error }
  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  //----------------------------------------------------------------{to show success }
  const showSuccess = (success) => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      payment processed successfuly
    </div>
  );
  //----------------------------------------------------------------{to show loading }
  const showLoading = (loading) => loading && <h2>Loading...</h2>;

  //----------------------------------------------------------------{Checkout final returns}
  return (
    <div>
      {/* {JSON.stringify(products)} */}
      <h2>Total: ${getTotal()}</h2>
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

//------------------------------------------------------------------------------------[Return]
export default Checkout;
