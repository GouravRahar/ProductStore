const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found in DB"
      });
    }
    req.category = cate;
    next();
  });
};
 
exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
      if (err) {
        return res.status(400).json({
          error: "NOT able to save category in DB"
        });
      }
      res.json({ category });
    });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "NO categories found"
      });
    }
    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
  
    category.save((err, updatedCategory) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to update category"
        });
      }
      res.json(updatedCategory);
    });
};

exports.removeCategory = (req, res) => {
    const category = req.category;
  
    category.remove((err, category) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete this category"
        });
      }
      res.json({
        message: "Successfull deleted"
      });
    });
};

// Line 18 Here new opeator creates new object and in next line we are saving the category in databse
// Line 46 Here we are able to access req.category becoz it is defined above in line 12 otherwise we would not have been able to do so
// Line 47 Here we are updating the existing category which is coming from front end
// Line 62 here we are receiving deleted category 
