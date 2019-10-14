const Student = require("../models/student.model");
const mongoose = require("mongoose");

exports.get_all_students = (req, res, next) => {
  Student.find()
    .where({ state: true })
    //.select("_id name description price stock")
    .populate("career", "_id name")
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

exports.create_student = (req, res, next) => {
  const student = new Student({
    _id: new mongoose.Types.ObjectId(),
    names: req.body.names,
    lastnames: req.body.lastnames,
    career: req.body.career,
    cedula: req.body.cedula,
    numero_unico: req.body.numero_unico,
    email: req.body.email,
    phone: req.body.phone
  });
  student
    .save()
    .then(result => {
      res.status(201).json({
        message: "Estudiante creado exitosamente",
        createdstudent: {
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

exports.get_student = (req, res, next) => {
  const id = req.params.studentId;
  Student.findById(id)
    //.select('name price _id')
    //.populate("category", "name")
    //.populate("supplier", "-__v")
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

exports.update_student = (req, res, next) => {
  const id = req.params.studentId;

  const updateProps = {};

  for (const props of Object.keys(req.body)) {
    updateProps[props] = req.body[props];
  }
  console.log(updateProps);

  Student.updateOne({ _id: id }, { $set: updateProps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Estudiante actualizado"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.delete_student = (req, res, next) => {
  const id = req.params.studentId;
  Student.updateOne({ _id: id }, { state: false })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Estudiante eliminado"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
