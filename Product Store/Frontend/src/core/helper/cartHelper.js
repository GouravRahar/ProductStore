export const addItemToCart = (item, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...item,
      count: 1
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
};

export const removeItemFromCart = productId => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, i) => {
      if (product._id === productId) {
        cart.splice(i, 1);
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};

// export const cartEmpty = next => {
//   if (typeof window !== undefined) {
//     localStorage.removeItem("cart");
//     let cart = [];
//     localStorage.setItem("cart", JSON.stringify(cart));
//     next();
//   }
// };

  
// Line 1-12 Here we are adding product to localStorage , so first we check if we have alredy added any
//..."cart" in localStorage, if yes then add this new item to it & also push it into cart array, if not
//...then make "cart" in localStorage and store that product in there
// Line 16 Here we are returning all the products saved in local storage
// Line 24-37 Here we are removing product from localStorage by recieving productId, first we are 
//...getting all of the existing products in cart variable then we are mapping through it and if
//...productId matches the one in localStorage we remove that particular product from there
//...and every other product remains there which was there from before
// Line 40 Here we are removing all products from localStorage at once