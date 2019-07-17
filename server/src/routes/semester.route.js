const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const SemesterController = require("../controllers/semester.controller");

//Show all semester
router.get("/", auth, SemesterController.get_all_semesters);
//Add a new semester
router.post("/", auth, SemesterController.create_semester);
//Show a semester by Id
router.get("/:semesterId", auth, SemesterController.get_semester);
//Update a semester by Id
router.put("/:semesterId", auth, SemesterController.update_semester);
//Delete a semester by Id
router.delete("/:semesterId", auth, SemesterController.delete_semester);

module.exports = router;
