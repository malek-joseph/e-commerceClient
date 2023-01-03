// Here we will apply the logic related to the filters we need to apply according to the checkbox selesctions
// We use the CheckBox in the Shop parent component, and we pass the categories from the parent state to the child using props.
import React, { useState, useEffect } from 'react'



const CheckBox = ({ categories, handleFilters }) => {
  const [checkedCategoriesIds, setCheckedCatigoriesIds] = useState([]);
  const handleToggle = (categoryId) => () => {
    // Higher order function syntax. Function returning another function
    // this line either returns the index of the category in the array or -1
    const newlyToggledCategoryIdIndex =
      checkedCategoriesIds.indexOf(categoryId);
    // take deep copy from the checked array
    const newCheckedCatgoriesIds = [...checkedCategoriesIds];
    // if the newly toggled category was not checked alreay, we push it to the updated checked copy, otherwise, we splice it from the array
    if (newlyToggledCategoryIdIndex === -1) {
      //  update the clone of categories ids, by adding the newly checked id using push
      newCheckedCatgoriesIds.push(categoryId);
    } else {
      //  update the clone of categories ids, by removing the unchecked id using splice
      newCheckedCatgoriesIds.splice(newlyToggledCategoryIdIndex, 1);
    }
    // console.log(newCheckedCatgoriesIds);
    // Now we update the Checked array in our state
    setCheckedCatigoriesIds(newCheckedCatgoriesIds);
    handleFilters(newCheckedCatgoriesIds);
  };
  return categories.map((category, index) => (
    <li key={index} className="list-unstyled">
      <input
        onChange={handleToggle(category._id)}
        type="checkbox"
        className="form-check-input"
        value={checkedCategoriesIds.indexOf(category._id)}
      />
      <label className="form-check-label">{category.name}</label>
    </li>
  ));
};


export default CheckBox