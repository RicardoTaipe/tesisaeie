const Locker = require("../models/locker.model");
const mongoose = require("mongoose");

exports.get_all_lockers = (req, res, next) => {
  let state = req.query.state;
  console.log(state);
  if (state === "false") {
    Locker.find({ state: false })
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
  } else {
    Locker.find()
      //.select("_id name description")
      .populate("student")
      .exec()
      .then(docs => {
        res.status(200).json(docs);
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }
};

exports.create_locker = (req, res, next) => {
  const locker = new Locker({
    _id: new mongoose.Types.ObjectId(),
    description: req.body.description,
    state: false
  });
  locker
    .save()
    .then(result => {
      res.status(201).json({
        message: "Created locker succesfully"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.get_locker = (req, res, next) => {
  const id = req.params.lockerId;
  Locker.findById(id)
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

exports.update_locker = (req, res, next) => {
  const id = req.params.lockerId;
  const updateProps = {};

  for (const props of Object.keys(req.body)) {
    updateProps[props] = req.body[props];
  }

  Locker.updateOne({ _id: id }, { $set: updateProps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "locker updated"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.delete_locker = (req, res, next) => {
  const id = req.params.lockerId;
  Locker.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "locker deleted"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.alquilar_locker = (req, res, next) => {
  const { lockerId } = req.params;
  const updateProps = {};

  for (const props of Object.keys(req.body)) {
    updateProps[props] = req.body[props];
  }

  Locker.updateOne({ _id: lockerId }, { $set: updateProps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Locker registered successfully"
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    });
};

exports.terminar_alquiler = (req, res, next) => {
  const { lockerId, studentId } = req.params;
  Locker.findOne({ _id: lockerId }, (err, lock) => {
    if (err) {
      res.status(500).json({
        message: err
      });
    }
    lock.student = undefined;
    lock.state = false;
    lock.valor = undefined;
    lock.save((err, doc) => {
      if (err) {
        res.status(500).json({
          message: err
        });
      }
      res.status(200).json({
        message: "Casillero Libre"
      });
    });
  });
};

exports.notify_locker= (req,res,next)=>{
  console.log(req.body.name)
  next()
};