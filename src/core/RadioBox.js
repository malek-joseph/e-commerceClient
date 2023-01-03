import React, { useState } from "react";


export const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event) => {
    handleFilters(event.target.value);
    setValue(event.target.value);
  };
  // console.log(prices);
  return prices?.map((price, index) => (
    <div key={index}>
      <input
        onChange={handleChange}
        type="radio"
        name="price"
        className="mr-2 ml-4"
        value={`${price._id}`}
      />
      <label className="form-check-label">{price.name}</label>
    </div>
  ));
};

export default RadioBox;
