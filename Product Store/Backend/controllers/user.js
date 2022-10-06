const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB"
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to update this user"
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  );
};

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No Order in this account"
        });
      }
      return res.json(order);
    });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach(product => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id
    });
  });

    //Store this in DB
    User.findOneAndUpdate(
      { _id: req.profile._id },
      { $push: { purchases: purchases } },
      { new: true },
      (err, purchases) => {
        if (err) {
          return res.status(400).json({
            error: "Unable to save purchase list"
          });
        }
        next();
      }
    );
  };




// Line 3 Here we storing params we give a unique id to every user and using that id we can perform various 
//... Operations in database easily(search params if not understood)
// Line 10 Here we are storing user info in new parameter in req profile
// Line 22 here we are returning every info about user after he logs in but that should not be the case
// Line 27 To update user first find that user and then what you want to update(28) 
// Line 36 Here we are using user.salt not re,profile becoz above in line 30 we are passing user parameter and
//... we are not setting it to anything 
// Line 45 In this controller We are pulling this info from Order model and we are selecting order based on 
//... req.profile.id which are pushed into it by particular user
// Line 46 Any time you are refrencing something in different collection Then you use Populate and we passes
//... 2parameteres here 1st Which model/object you want to update and then what field we want to bring in
// Line 59 Here we are accessing req.body.order.product now thi is gonna come from front end and it will
//... be an array having all products in it and we are gonna push every product info into another array defined
//...above, so products is entire array and product will every element name which we looping through it
// Line 74 Here we are updating left Object with our local purchases(defined above  in line 57)
// Line 75 so we get two thing from database error and object itself so here we are saying new : true 
//...we are sayiing that give us the updated object