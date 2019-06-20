const express = require("express");
const router = express.Router();

const studentsController = require("../controllers/student.controller");

//Show all students
router.get("/", studentsController.get_all_students);

//Add a new student
router.post("/", studentsController.create_student);
//Show a student by Id
router.get("/:studentId", studentsController.get_student);
//Update a student by Id
router.put("/:studentId", studentsController.update_student);
//Delete a student by Id
router.delete("/:studentId", studentsController.delete_student);

module.exports = router;
