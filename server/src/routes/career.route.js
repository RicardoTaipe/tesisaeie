const express = require("express");
const router = express.Router();

const CareerController = require("../controllers/career.controller");

//Show all categories
router.get("/", CareerController.get_all_careers);
//Add a new career
router.post("/", CareerController.create_career);
//Show a career by Id
router.get("/:careerId", CareerController.get_career);
//Update a career by Id
router.put("/:careerId", CareerController.update_career);
//Delete a career by Id
router.delete("/:careerId", CareerController.delete_career);

module.exports = router;
