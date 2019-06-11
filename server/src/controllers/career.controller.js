const Career = require("../models/career.model");
const mongoose = require("mongoose");

exports.get_all_careers = (req, res, next) => {
  Career.find()
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

exports.create_career = (req, res, next) => {
  const career = new Career({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name
  });
  career
    .save()
    .then(result => {
      res.status(201).json({
        message: "Created career succesfully"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.get_career = (req, res, next) => {
  const id = req.params.careerId;
  Career.findById(id)
    .select("_id name")
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

exports.update_career = (req, res, next) => {
  const id = req.params.careerId;
  const updateProps = {};

  for (const props of Object.keys(req.body)) {
    updateProps[props] = req.body[props];
  }

  Career.updateOne({ _id: id }, { $set: updateProps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "career updated"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.delete_career = (req, res, next) => {
  const id = req.params.careerId;
  Career.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "career deleted"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
