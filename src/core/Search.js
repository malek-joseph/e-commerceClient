import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  // 1 we get the categories from the backend
  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  // 2 load the categories when the component mounts using useEffect hook
  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    // This shows the search input value and the category id
    // console.log(search, category );
    // we created a method in apiCore to handle the backend request, by sending the search input and the category to the backend we expect to fetch products results according to the search criteria.
    if (search) {
      // we first validate if we have search input
      list({ search: search || undefined, category: category })
      .then(
        (response) => {
          if (response.error) {
            // we used response because we have data in the state, so to avoid name collision
            console.log(response.error);
            // console.log('failed');
          } else {
            setData({...data, results: response, searched: true})
          }
        }
      );
    }
  };

    const searchMessage = (searched, results) => {
      // If the search yielded a result
        if (searched && results.length > 0) {
            return `Found ${results.length} products`;
        }
        // if the search didn't yield any product
        if (searched && results.length < 1) {
            return `No products found`;
        }
    };
// we give the results a default value of an empty array, 
   const searchedProducts = (results = []) => {
        return (
            <div>
                <h2 className="mt-4 mb-4">
                    {searchMessage(searched, results)}
                </h2>

                <div className="row ">
                    {results.map((product, i) => (
                            <Card key={i} product={product} className="col-4 mb-3"/>
                    ))}
                </div>
            </div>
        );
    };


  // We always prevent the default behaviour of refreshing the page when a form is submitted, and we do that with the submit form function
  const searchSubmit = (event) => {
    event.preventDefault();
    // searchData: picks search and category from the state to make the backend request accordinlgy.
    searchData();
  };

  // use use the handleChange function for both the category and the search
  // we make handleChange a higher order function, because we need to pass the name as an argument, to use the function to both category and search
  // the name here could be the category or the search passed to the handleChange function in the form
  const handleChange = (name) => (event) => {
    // searched is used to define if the client search and didn't find the results to do actions accordingly.
    setData({ ...data, [name]: event.target.value, searched: false });
  };
  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      {/* We place the form content in a span tag to make all the components of the search in 1 line */}
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          {/* prepent: prepends the element before the input search */}
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              {/* option with value='all' makes sure the default is selecting all categories */}
              <option value="all">in All categories</option>
              {categories.map((category, index) => {
                return (
                  <option key={index} value={category._id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search By Name"
          ></input>
        </div>
        <div className="btn input-group-append" style={{ border: "none " }}>
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  );

  // return <h2>Search {JSON.stringify(categories)}</h2>;
  return (
    <div className="row">
      <div className="container mb-3">
      {searchForm()}
      {/* {JSON.stringify(results)} */}
      </div>
       <div className="container-fluid mb-3">
      {searchedProducts(results)}
      </div>
    </div>
  );
};

export default Search;
