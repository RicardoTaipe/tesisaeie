const Role = require("../models/role.model");
const mongoose = require("mongoose");

exports.get_all_roles = (req, res, next) => {
  Role.find()
    .select("_id name ")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        role: docs
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

exports.create_role = (req, res, next) => {
  const role = new Role({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name
  });
  role
    .save()
    .then(result => {
      res.status(201).json({
        message: "Created role succesfully",
        createdRole: {
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

exports.get_role = (req, res, next) => {
  const id = req.params.roleId;
  Role.findById(id)
    .select("_id name")
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

exports.update_role = (req, res, next) => {
  const id = req.params.roleId;

  const updateProps = {};

  for (const props of Object.keys(req.body)) {
    updateProps[props] = req.body[props];
  }

  Role.updateOne({ _id: id }, { $set: updateProps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Role updated"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.delete_role = (req, res, next) => {
  const id = req.params.roleId;
  Role.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Role deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
