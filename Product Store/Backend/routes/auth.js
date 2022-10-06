var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

// all here  will be used after /api 
//ex /api/signup
// Post here works in postman so to use that we cant open /signup in browser we use that in postman
router.post(
  "/signup",
  [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min: 3 })
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 1 })
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;

// Line 12-14 here we use different validator to check if everything entered by user is correct
// Line 16-18 Here we take signin info from the user