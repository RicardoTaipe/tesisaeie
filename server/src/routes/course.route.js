const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const courseController = require("../controllers/course.controller");

//Show all courses
router.get("/", courseController.get_all_courses);
//Add a new course
router.post("/", auth, courseController.create_course);
//Show a course by Id
router.get("/:courseId", auth, courseController.get_course);
//Update a course by Id
router.put("/:courseId", courseController.update_course);
//Delete a course by Id
router.delete("/:courseId", auth, courseController.delete_course);

module.exports = router;
