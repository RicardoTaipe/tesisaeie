const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const studentsController = require("../controllers/student.controller");

//Show all students
router.get("/", auth, studentsController.get_all_students);

//Add a new student
router.post("/", auth, studentsController.create_student);
//Show a student by Id
router.get("/:studentId", auth, studentsController.get_student);
//Update a student by Id
router.put("/:studentId", auth, studentsController.update_student);
//Delete a student by Id
router.delete("/:studentId", auth, studentsController.delete_student);

module.exports = router;
