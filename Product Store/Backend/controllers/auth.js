const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB"
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id
    });
  });
};
  
exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER email does not exists"
      });
    }

    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match"
      });
    }
    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });


};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully"
  });
};

//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth"
});
 //custom middlewares
 exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED"
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not ADMIN, Access denied"
    });
  }
  next();
};

  // exports.everyUser = (req,res)=>{
  //   return req.profile
  // }


  // Line 6 This will work in postman not in the browser as browser cant directly take post req
  // Line 8     // Finds the validation errors in this request and wraps them in an object with handy functions
  // Line 10 This here detects if there was any error 
  // Line 11 This here returns json type that what error has been there
  // Line 12 Now here error was a object so that is now converted to array and msg is displayed of invalid value(look from site)
  // Line 16 req.body holds parameters that are sent up from the client as part of a POST request.
  // Line 17 Now user.save() alone saves the data into database but we have to write something that if anything
  // ... catches error it should return something . Now this user is class of User again which is class of Mongoose
  // ... So we can use all mongoose property here
  // Line 19 res.statu(400) will return code Bad Req and .json will also return that code making it
  // ... making it simple for front end dev to display message
  // Line 23 Now this will send these json fields to the user just to tell him what has been saved
  // Line 32 so here two things are extracted from the req.body(which initially stored all information entered by the user)
  // Line 33-35 same as 10-12
  // Line 38 This here is a inbulit function (email is passed to match becoz we have destructured it in 32) which will find first 
  // ...matched email in database (enterd in user method) and there is a callback here and returns 2 thing error
  // ...(if there is any) and the object itself(and we can name it acc to ourself)
  // Line 39-41 if it return err means the email was wrong and outputs the written value
  // Line 45 Now email exists so we will check if the pass is correct
  // Line 50-56 This is to store the cookies in the browser
  // Line 71-73 Now this is a middleware but it doesnot req next parameter becoz it is already inside the expressjwt variable
  // ...Now what this is doing is, it is adding a new property to the req parameter userProperty  auth and whenever 
  // ...this middleware is called this property is added to that req now this req.auth hold 2 thing(generally) a _id and iat(issued at)
  // ...now this id generated is same as when a user signs and gets generated(as saved in schema _id) 