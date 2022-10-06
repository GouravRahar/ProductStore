const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found"
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }
    //destructure the fields
    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please include all fields"
      });
    }

    let product = new Product(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    // console.log(product);

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Saving tshirt in DB failed"
        });
      }
      res.json(product);
    });
  });
};


exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

// Middleware
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

//delete Controllers
exports.deleteProduct = (req, res) => {
  let product = req.productId;
  Product.findOneAndDelete(product,(err) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the product"
      });
    }
    res.json({
      message: "Deletion was a success",
      product
    });
  });
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }
    //updation code
    let product = req.product;
    product = _.extend(product, fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Updation of product failed"
        });
      }
      res.json(product);
    });
  });
};

//Product listing
exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "NO product FOUND"
        });
      }
      res.json(products);
    });
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map(prod => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } }
      }
    };
  });

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk operation failed"
      });
    }
    next();
  });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "NO category found"
      });
    }
    res.json(category);
  });
};

// Some times we use return to return something in middleware and some time we user res.json , now when we use 
// res.json it will send some response to the front end but will also keep executing the code if there is any 
// but if we use return then it sends response to the front end thats it.
// Line 4 Here we are requiring it becoz we also need the path or directory from where the photo is coming
// Line 22 it keeps the extension of photo whether its png or jpeg or anything else
// Line 24 Here it takes 3 fields 1st is error 2nd is description or name or anything and 3rd one is file
// Line 32 Here are destructuring the fields , this means that before this we must use fileds.price or fields.name
//... But now sice we have destructured it we can use directly price or name to use that 
// Line 47 if there is no error then we are creating new Product
// Line 51 Here we are setting that file size should be less than 3 mb
// Line 56-57 Here we are including file in product and setting properties of product here(see prop in models product.js)
// Line 61 Here we are saving photo/product in database
// Line 66-68 Here we are setting it undefined becoz product can be bulky  , so to make it faster we are doing it
// Line 72 Here we are parsing or sending  photo in the background while the above code runs
// Line 96 Here what we are doing is overwriting the details and saving the product in db so its same as create 
//...product bue we just edited couple of things like _.extend (see exm on google if not understood about it)
// Line 135 Here er created this to show all products in databse to user
// Line 136 Here we are saying that how many products does user want to see, if user dont say anything deafult is 8
//...we are excessing this using .limit afte ? we are converting string into array becoz the input comes in string
//...before ? it says if there is query which is like this(query.limit) then take that value otherwise take 8
// Line 137 Here we are sorting the products with same as limit
// Line 140 here we are using "-" which de selects the photo coz photo takes too much time
// Line 154 Here we will be updating stocks and sold items after every product is sold(we can create 2 middlewares
//...also but it is more used and widely used so we are ussing thi(model.bulkwrite())
// Line 156 Here we are mapping through array of products one has ordred and we are updating the sold and stock for
//...everyone 
// Line 164 we pass 3 parameters in bulkwrite 1st is ops(operations we want to perform) 2nd is options and 3rd is
//...Normal callack function which passes err and the result updated
// Line 174 It ia an alternative for to find category