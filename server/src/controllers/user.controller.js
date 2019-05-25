const mongoose = require("mongoose");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(404).json({
          message: "Login fallo"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Autenticacion fallida"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            process.env
              .JWT_KEY /*,
            {
              expiresIn: "1h"
            }*/
          );
          return res.status(200).json({
            message: "Auth succesful",
            token: token,
            uid: user[0]._id
          });
        }
        return res.status(401).json({
          message: "Autenticacion fallida"
        });
      });
    })
    .catch();
};
exports.get_all_users = (req, res) => {
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

exports.create_user = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user) {
        return res.status(422).json({
          message: "User already exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              names: req.body.names,
              lastnames: req.body.lastnames,
              username: req.body.username,
              email: req.body.email,
              password: hash,
              phone: req.body.phone,
              roles: req.body.roles
            });
            user
              .save()
              .then(result => {
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};

exports.get_user = (req, res) => {
  const id = req.params.userId;
  User.findById(id)
    .populate("roles", "_id name")
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

exports.update_user = (req, res) => {
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

exports.delete_user = (req, res) => {
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

exports.verify_token = (req, res) => {
  const token = req.body.token;
  if (token != "") {
    jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
      if (error) {
        return res.status(404).json(error);
      }
      return res.status(200).json("ok");
    });
  }
  return res.status(401).json({
    message: "Auth failed"
  });
};
