import React, { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";

const Card = ({
  showViewProductButton = true,
  product,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  // run and setRun are created deliver the update in the state of the card, not only to card and the localStorage of cart, but pass it to cart UI as well
  run = undefined, // defailt value of undefined
  setRun = (f) => f, // default value of function
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count); // search for the count method in Js google sheets
  // View Producs is displayed by default, unless we send its props as false
  // here we destructure the product from the props
  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <NavLink className="mr-2" to={`/product/${product._id}`}>
          <button className="btn btn-outline-primary mb-2 mt-2 mr-2 ">
            View Product
          </button>
        </NavLink>
      )
    );
  };

  const addToCart = () => {
    // addItem(Item, next)
    addItem(product, () => {
      // after adding the item to the cart, setRedirect to true so that we can use it later
      // setRedirect(true); if we want to be redirected to cart after we add a product to the cart
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Navigate to="/cart" />;
    }
  };

  const showAddtoCart = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-outline-warning mb-2  mt-2"
        >
          Add to Cart
        </button>
      )
    );
  };
  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // this runs useEffect in cart, to update the removal of the item in the UI of cart
          }}
          className="btn btn-outline-danger mb-2  mt-2"
        >
          Remove Product
        </button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock</span>
    );
  };

  // higher order function, is a function that returns a function
  const handleChange = (productId) => (event) => {
    // this runs the useEffect in the Parent "Cart" when the count increment or decrement, and we handle removal in the remove function
    setRun(!run);
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity!</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  return (
    <div className="card">
      {/* the name class is used to custom design the header in the css styles file */}
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />
        <p className="lead mt-2">{product.description.substring(0, 100)}</p>
        <p className="black-10">${product.price}</p>
        <p className="black-9">
          Category: {product.category && product.category.name}
        </p>
        {/* moment is a 3rd party npm library, fromNow() method displays how long age was the element created */}
        <p className="black-8">Added: {moment(product.createdAt).fromNow()}</p>
        {/* We need to grab the product Id from the dB and we use it to handle the backend requests */}
        {showStock(product.quantity)}
        <br />
        {showViewButton(showViewProductButton)}
        {showRemoveButton(showRemoveProductButton)}
        {showAddtoCart(showAddToCartButton)}
        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default Card;
