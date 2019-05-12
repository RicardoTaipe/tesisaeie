const Sale = require("../models/sale.model");
const mongoose = require("mongoose");

exports.get_all_sales = (req, res, next) => {
  Sale.find()
    //.select('_id name description')
    .populate("user")
    .populate("product")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        sales: docs
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.create_sale = (req, res, next) => {
  const sale = new Sale({
    _id: new mongoose.Types.ObjectId(),
    date: req.body.date,
    total_value: req.body.total_value,
    products: req.body.products,
    user: req.body.user
  });
  sale
    .save()
    .then(result => {
      res.status(201).json({
        message: "Created sale succesfully",
        createdSale: {
          result
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.get_sale = (req, res, next) => {
  const id = req.params.saleId;
  Sale.findById(id)
    //.select('name price _id')
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found id for provided Id" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.update_sale = (req, res, next) => {
  const id = req.params.saleId;

  const updateProps = {};

  for (const props of Object.keys(req.body)) {
    updateProps[props] = req.body[props];
  }

  Sale.updateOne({ _id: id }, { $set: updateProps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Sale updated"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.delete_sale = (req, res, next) => {
  const id = req.params.saleId;
  Sale.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Sale deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
