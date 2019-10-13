const Product = require("../models/product.model");
const mongoose = require("mongoose");

exports.get_all_products = (req, res, next) => {
  Product.find()
    .where({ state: true })
    .select("_id name description price stock")
    .populate("category", "_id name description")
    .populate("supplier", "_id name")
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

exports.create_product = (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    category: req.body.category,
    supplier: req.body.supplier
  });
  product
    .save()
    .then(result => {
      res.status(201).json({
        message: "Producto creado exitosamente",
        createdProduct: {
          result
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.get_product = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    //.select('name price _id')
    .populate("category", "name")
    .populate("supplier", "-__v")
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

exports.update_product = (req, res, next) => {
  const id = req.params.productId;

  const updateProps = {};

  for (const props of Object.keys(req.body)) {
    updateProps[props] = req.body[props];
  }

  Product.updateOne({ _id: id }, { $set: updateProps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Producto actualizado"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.delete_product = (req, res, next) => {
  const id = req.params.productId;
  Product.updateOne({ _id: id }, { state: false })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Producto eliminado"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
