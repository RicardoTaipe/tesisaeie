const Course = require("../models/course.model");
const mongoose = require("mongoose");

exports.get_all_courses = (req, res, next) => {
  Course.find()
    //.select("_id name description")
    .where({ state: true })
    .populate("semester")
    .populate("students")
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

exports.create_course = (req, res, next) => {
  const course = new Course({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    date: req.body.date,
    price: req.body.price,
    places: req.body.places,
    semester: req.body.semester
    //students: req.body.students
  });
  course
    .save()
    .then(result => {
      res.status(201).json({
        message: "Curso creado exitosamente"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.get_course = (req, res, next) => {
  const id = req.params.courseId;
  Course.findById(id)
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

exports.update_course = (req, res, next) => {
  const id = req.params.courseId;
  const updateProps = {};

  for (const props of Object.keys(req.body)) {
    updateProps[props] = req.body[props];
  }

  Course.updateOne({ _id: id }, { $set: updateProps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Curso actualizado"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.delete_course = (req, res, next) => {
  const id = req.params.courseId;
  Course.updateOne({ _id: id }, { state: false })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Curso eliminado"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
