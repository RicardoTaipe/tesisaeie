const express = require("express");
const router = express.Router();

const SemesterController = require("../controllers/semester.controller");

//Show all semester
router.get("/", SemesterController.get_all_semesters);
//Add a new semester
router.post("/", SemesterController.create_semester);
//Show a semester by Id
router.get("/:semesterId", SemesterController.get_semester);
//Update a semester by Id
router.put("/:semesterId", SemesterController.update_semester);
//Delete a semester by Id
router.delete("/:semesterId", SemesterController.delete_semester);

module.exports = router;
