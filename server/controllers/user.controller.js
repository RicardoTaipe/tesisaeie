const User = require("../models/user.model");
const mongoose = require("mongoose");

exports.get_all_users = (req, res, next) => {
  User.find()
    .select("-__v")
    .populate("roles", "_id name")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        users: docs
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

exports.create_user = (req, res, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    names: req.body.names,
    lastnames: req.body.lastnames,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    roles: req.body.roles
  });
  user
    .save()
    .then(result => {
      res.status(201).json({
        message: "Created user succesfully",
        createdUser: {
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

exports.get_user = (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .populate("roles", "_id name")
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

exports.update_user = (req, res, next) => {
  const id = req.params.userId;

  const updateProps = {};

  for (const props of Object.keys(req.body)) {
    updateProps[props] = req.body[props];
  }

  User.updateOne({ _id: id }, { $set: updateProps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "User updated"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.delete_user = (req, res, next) => {
  const id = req.params.userId;
  User.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
