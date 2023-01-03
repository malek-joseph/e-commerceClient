export const addItem = (item, next) => {
  // next is set to run an action after the item is added to the local storage
  // [1] we initialize the value of the cart to update it later
  let cart = [];
  if (typeof window !== "undefined") {
    // notice undefined is wrapped in single quotes
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.push({ ...item, count: 1 });
    // to remove the duplicates if the client added the same product multiple time, we should update the count instead of adding the product again
    // the first map makes sure that the same id is not in the array, check array.from() docs in MDN and check set
    cart = Array.from(new Set(cart.map((p) => p._id))).map((id) => {
      return cart.find((product) => product._id === id);
    });
    // After the duplicates are removed, we set the localStorage with the value of cart
    localStorage.setItem("cart", JSON.stringify(cart));
    // we run the callback function passed from the parent component as props in the argument, to execute code after the localStorage is updated
    next();
  }
};

export const itemTotal = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")).length;
    }
  }
  return 0;
};

export const getCart = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
  return [];
};
// productId and count are props f rom Card and this method is used to update the count when the user changes it
export const updateItem = (productId, count) => {
// [1] we initialize cart to fill it from the localStorage
  let cart = []
  // [2] We assign cart the value of the localStorage
  if (typeof (window) !== 'undefined') {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
  }
  // [3] We map through the cart to find the product with id matching the item that triggered the handle change function
  cart.map((product, index) => {
    if (product._id === productId) {
      cart[index].count = count // [4] we assign the new count, to the relevant item in the cart
    }
  })
  // [5] We update the local storage with the new cart value after updating the relevant item count accordinlgy
  localStorage.setItem('cart', JSON.stringify(cart))
};



export const removeItem = (productId) => {
// [1] we initialize cart to fill it from the localStorage
  let cart = []
  // [2] We assign cart the value of the localStorage
  if (typeof (window) !== 'undefined') {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
  }
  // [3] We map through the cart to find the product with id matching the item that triggered the handle change function
  cart.map((product, index) => {
    if (product._id === productId) {
      cart.splice(index, 1) // [4] we assign the new count, to the relevant item in the cart
    }
  })
  // [5] We update the local storage with the new cart value after updating the relevant item count accordinlgy
  localStorage.setItem('cart', JSON.stringify(cart))
};


// [Empty the cart after successful payment]
// We use emptyCart in Checkout, we pass next as a callback function, to deliver a message after the cart is emptied.
export const emptyCart = (next) => {
  if (typeof (window) !== 'undefined') {
    localStorage.removeItem('cart')
    next()
  }
};
