const Aporte = require("../models/aporte.model");
const mongoose = require("mongoose");

exports.get_all_aportes = (req, res, next) => {
  Aporte.find()
    //.select("_id name description")
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

exports.create_aporte = (req, res, next) => {
  const aporte = new Aporte({
    _id: new mongoose.Types.ObjectId(),
    valor: req.body.valor,
    description: req.body.description,
    date: req.body.date,
    semester: req.body.semester,
    student: req.body.student
  });
  aporte
    .save()
    .then(result => {
      res.status(201).json({
        message: "Created aporte succesfully"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.get_aporte = (req, res, next) => {
  const id = req.params.aporteId;
  Aporte.findById(id)
    //.select("_id name")
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

exports.update_aporte = (req, res, next) => {
  const id = req.params.aporteId;
  const updateProps = {};

  for (const props of Object.keys(req.body)) {
    updateProps[props] = req.body[props];
  }

  Aporte.updateOne({ _id: id }, { $set: updateProps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "aporte updated"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.delete_aporte = (req, res, next) => {
  const id = req.params.aporteId;
  Aporte.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "aporte deleted"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
