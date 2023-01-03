import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import Layout from "./Layout";
import { getCart } from "./cartHelpers";
import Card from "./Card";
import Checkout from './Checkout'

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  // getting the items from the local storage and storing it in the state
  useEffect(() => {
    setItems(getCart());
  }, [run]); // we place items as a dependency, so if items changed, useEffect runs and updates the cart items to the client interface

  const showItems = (items) => {
    return (
      <div>
        <h2>You have {items.length} Items in the cart!</h2>
        <hr />
        {items.map((product, index) => (
          // we only send the cartUpdate prop from the cart to the card with true, to show the relevant options[increment and decrement] only in the cart 
          <Card
            product={product}
            key={index}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            run={run}
            setRun={setRun}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => {
    return (
      <h2>
        No Items added yet. <br />{" "}
        <NavLink to="/shop">Continue shopping...</NavLink>
      </h2>
    );
  };

  return (
    <Layout
      title="Shopping Cart"
      className="container-fluid"
      description="Finzlizing your order!"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-6">
          <h2 className="mb-4">Your Cart Summary:</h2>
          <hr />
          {/* We pass the items to the Checkout component as props so that it can use it to get the products and calculate the chckout summary accordingly */}
          <Checkout products={items} setRun={setRun} run={ run}/>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
