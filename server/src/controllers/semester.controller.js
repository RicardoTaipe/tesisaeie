const Semester = require("../models/semester.model");
const mongoose = require("mongoose");

exports.get_all_semesters = (req, res, next) => {
  Semester.find()
    .select("_id name")
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

exports.create_semester = (req, res, next) => {
  const semester = new Semester({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name
  });
  semester
    .save()
    .then(result => {
      res.status(201).json({
        message: "Created semester succesfully"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.get_semester = (req, res, next) => {
  const id = req.params.semesterId;
  Semester.findById(id)
    //.select("_id name description")
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

exports.update_semester = (req, res, next) => {
  const id = req.params.semesterId;
  const updateProps = {};

  for (const props of Object.keys(req.body)) {
    updateProps[props] = req.body[props];
  }

  Semester.updateOne({ _id: id }, { $set: updateProps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "semester updated"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.delete_semester = (req, res, next) => {
  const id = req.params.semesterId;
  Semester.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "semester deleted"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
