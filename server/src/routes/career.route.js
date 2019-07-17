const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const CareerController = require("../controllers/career.controller");

//Show all categories
router.get("/", auth, CareerController.get_all_careers);
//Add a new career
router.post("/", auth, CareerController.create_career);
//Show a career by Id
router.get("/:careerId", auth, CareerController.get_career);
//Update a career by Id
router.put("/:careerId", auth, CareerController.update_career);
//Delete a career by Id
router.delete("/:careerId", auth, CareerController.delete_career);

module.exports = router;
