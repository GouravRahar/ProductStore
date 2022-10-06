import { API } from "../../backend";

export const signup = user => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const signin = user => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = next => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();

    return fetch(`${API}/signout`, {
      method: "GET"
    })
      .then(response => console.log("signout success"))
      .catch(err => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};


  

//Line 5-12 First here fetch means the address that is setup in backend and we are sending
//... data to it We are just mentioning all the things that we use to mention in postman
//Line 13 .then means if everything goes as success and catch means if anything goes wrong
//Line 23 in headers in Accept dont have double qot on it it is just like that
//Line 35 It's an idiomatic check to see if the script is being run in a web-page inside
//... a web-browser or not, it will execute the if block if the window object does exist
//... as a top level variable
//Line 36 here we are making sure, user is loggedin by storing token in users localstorage
//Line 58 here we are returning the token nit true coz in frontend when we will call this
//...then we will again check this that if the token is same as assigned to user before
