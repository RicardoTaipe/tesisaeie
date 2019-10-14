const Aporte = require("../models/aporte.model");
const mongoose = require("mongoose");

exports.get_all_aportes = (req, res, next) => {
  Aporte.find()
    .where({ state: true })
    //.select("_id name description")
    .populate("student")
    .populate("semester")
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
        message: "Aporte creado exitosamente"
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
        message: "Aporte actualizado"
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
  Aporte.updateOne({ _id: id }, { state: false })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Aporte eliminado"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
