const Supplier = require("../models/supplier.model");
const mongoose = require("mongoose");

exports.get_all_suppliers = (req, res, next) => {
  Supplier.find()
    .select("_id name phone")
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.create_supplier = (req, res, next) => {
  const supplier = new Supplier({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    phone: req.body.phone
  });
  supplier
    .save()
    .then(result => {
      res.status(201).json({
        message: "Created supplier succesfully"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.get_supplier = (req, res, next) => {
  const id = req.params.supplierId;
  Supplier.findById(id)
    .select("_id name phone ")
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

exports.update_supplier = (req, res, next) => {
  const id = req.params.supplierId;

  const updateProps = {};

  for (const props of Object.keys(req.body)) {
    updateProps[props] = req.body[props];
  }

  Supplier.updateOne({ _id: id }, { $set: updateProps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Supplier updated"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.delete_supplier = (req, res, next) => {
  const id = req.params.supplierId;
  Supplier.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Supplier deleted"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
