import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "../core/Search";

const Home = () => {
  // beware not to use the [] while setting the initial values of the products search, because the data received from the backend will be in the form of an array
  const [productBySell, setProductBySell] = useState([]);
  const [productByArrival, setProductByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductBySell(data);
      }
    });
  };
  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductByArrival(data);
      }
    });
  };
  // We use the useEffect hook, to render the components when mounted, and whenever a change in the state happens
  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title="Home Page"
      className="container-fluid"
      description="MERN E-Commerce"
    >
      <Search />
      {/* Static*/}
      {/* {JSON.stringify(productByArrival)} */}
      {/* Dynamic */}
      <h2 className="mb-4">New Arrivals</h2>
      <div className="row">
        {productByArrival.map((product, index) => (
          <div key={index} className="col-4 mb-3">
            <Card product={product} />
          </div>
        ))}
      </div>
      <hr />
      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productBySell.map((product, index) => {
          return (
            <div key={index} className=" col-4 mb-3">
              <Card product={product} />
            </div>
          );
        })}
      </div>

      {/* {JSON.stringify(productBySell)} */}
    </Layout>
  );
};
export default Home;
