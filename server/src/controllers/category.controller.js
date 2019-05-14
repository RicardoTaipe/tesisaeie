const Category = require("../models/category.model");
const mongoose = require("mongoose");

exports.get_all_categories = (req, res, next) => {
  Category.find()
    .select("_id name description")
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.create_category = (req, res, next) => {
  const category = new Category({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description
  });
  category
    .save()
    .then(result => {
      res.status(201).json({
        message: "Created category succesfully"
        /*createdCategory: {
          result
        }*/
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.get_category = (req, res, next) => {
  const id = req.params.categoryId;
  Category.findById(id)
    .select("_id name description")
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found id for provided Id" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.update_category = (req, res, next) => {
  const id = req.params.categoryId;
  const updateProps = {};

  for (const props of Object.keys(req.body)) {
    updateProps[props] = req.body[props];
  }

  Category.updateOne({ _id: id }, { $set: updateProps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Category updated"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.delete_category = (req, res, next) => {
  const id = req.params.categoryId;
  Category.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Category deleted"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
