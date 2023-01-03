import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const { user, token } = isAuthenticated();
  // we create a method to grab orders from the backend, and then we call it in useEffect to run it when the component mounts
  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };
  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h1 className="text-danger display-2">Total orders: {orders.length}</h1>
      );
    } else {
      return <h1 className="text-danger">No Orders Found</h1>;
    }
  };

  const showInput = (key, value) => (
    <div className="input-group mb-3 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>
  );

  const handleStatusChange = (event, orderId) => {
    updateOrderStatus(user._id, token, orderId, event.target.value).then((data) => {
      if (data.error) {
        console.log('failed to update the status!');
      } else {
        // so that if the status changed we load the orders again to rerender the status update
        loadOrders()
      }
    })
  };

  const showStatus = (order) => (
    <div className="form-group">
      <h3 className="mark mb-4"> Status: {order.status}</h3>
      <select
        className="form-control"
        onChange={(event) => {
          handleStatusChange(event, order._id);
        }}
      >
        <option>Update Status</option>
        {statusValues.map((status, index) => {
          return (
            <option value={status} key={index}>
              {status}
            </option>
          );
        })}
      </select>
    </div>
  );
  return (
    <Layout
      title="Orders"
      description={`G'day ${user.name}, you can manage the orders here `}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showOrdersLength()}
          {/* {JSON.stringify(orders)} */}
          {orders.map((order, orderIndex) => {
            return (
              <div
                key={orderIndex}
                className="mt-5"
                style={{ borderBottom: "5px solid indigo" }}
              >
                <h2 className="mb-5">
                  <span className="bg-primary"> Order Id: {order._id}</span>
                </h2>
                <ul className="list-group mb-2">
                  {/* This was used to show the default value of status not processed from backend order schema */}
                  {/* <li className="list-group-item">{order.status}</li> */}
                  {/* This is used as the dynamic replacement for the status value */}
                  <li className="list-group-item">{showStatus(order)}</li>
                  <li className="list-group-item">
                    Transaction Id: {order.transaction_id}
                  </li>
                  <li className="list-group-item">Amount: ${order.amount}</li>
                  <li className="list-group-item">
                    Ordered By: ${order.user.name}
                  </li>
                  <li className="list-group-item">
                    Ordered: {moment(order.createdAt).fromNow()}
                  </li>
                  <li className="list-group-item">
                    Delivery Address: {order.address}
                  </li>
                </ul>
                <h3 className="mb-3 mt-3 font-italic">
                  Total products in the order: {order.products.length}
                </h3>
                {order.products.map((product, productIndex) => (
                  <div
                    className="mb-4"
                    key={productIndex}
                    style={{ padding: "20px", border: "1px solid indigo" }}
                  >
                    {showInput("Product Name", product.name)}
                    {showInput("Product Price", product.price)}
                    {showInput("Product Total", product.count)}
                    {showInput("Product Id", product._id)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
