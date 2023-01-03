import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getCategories, getFilteredProducts } from "./apiCore";
import CheckBox from "./CheckBox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";

import Card from "./Card";

const Shop = () => {
  // initializing the state
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [size, setSize] = useState(0);
  // The below code is to load the categories from the backend
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    //  console.log(newFilters);
    //  asunc function because it makes request to the backend
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        // console.log(data.data);

        setFilteredResults(data.data);
        setSize(data.size)
        setSkip(0) // setSkip will be used to load more products

      }
    });
  };
  const loadMore = (newFilters) => {
    let toSkip = skip + limit
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        console.log(data.data);
        setFilteredResults([...filteredResults,  ...data.data]);
        setSize(data.size)
        setSkip(toSkip); // setSkip will be used to load more products

      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 && size >= limit && <button className="btn btn-warning mb-5" onClick={loadMore}>Load more... </button>
    )
  }
  // We need to call the init function, to load the categories asybchronously from the backend when the component mounts, so we use the useEffect hook
  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  // We will pass handleFilters function as props to the child CheckBox, passing the filters and the filterBy as arguments
  const handleFilters = (filters, filterBy) => {
    // Copy the filters object in the state
    // console.log('SHOP',filters, filterBy);
    const newFilters = { ...myFilters };
    // ammend the values of the state copy using the filters you receive in the argument, when the function is called
    newFilters.filters[filterBy] = filters;
    // transform the price to array of price range instead of ids
    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    let data = prices;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <Layout
      title="Shop Page"
      className="container-fluid"
      description="Search and filter, to find your suitable purchase"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter by Categories</h4>
          {/* {JSON.stringify(categories)} >> display raw categories response into the page */}
          <ul>
            {/* The below statement polupates all the items in the categories array into a <li/>s with the structure identified in CheckBox   */}
            <CheckBox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>
          <h4>Filter by Price Ra nge</h4>
          <div>
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </div>
        {/* <div className="col-8">{JSON.stringify(myFilters)}</div>  display the filters  as text in the DOM*/}
        {/* <div className="col-8">{JSON.stringify(filteredResults)}</div> display the filtered items as text in the DOM */}
        <div className="col-8">
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {filteredResults.map((product, index) => (
              <div key={index} className='col-4 mb-3' >
              <Card product={product}  />

              </div>

            ))}
          </div>
          <hr/>
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
