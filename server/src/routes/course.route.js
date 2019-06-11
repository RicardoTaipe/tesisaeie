const express = require("express");
const router = express.Router();

const courseController = require("../controllers/course.controller");

//Show all courses
router.get("/", courseController.get_all_courses);
//Add a new course
router.post("/", courseController.create_course);
//Show a course by Id
router.get("/:courseId", courseController.get_course);
//Update a course by Id
router.put("/:courseId", courseController.update_course);
//Delete a course by Id
router.delete("/:courseId", courseController.delete_course);

module.exports = router;
