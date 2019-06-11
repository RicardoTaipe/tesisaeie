const express = require("express");
const router = express.Router();

const aporteController = require("../controllers/aporte.controller");

//Show all aportes
router.get("/", aporteController.get_all_aportes);
//Add a new aporte
router.post("/", aporteController.create_aporte);
//Show a aporte by Id
router.get("/:aporteId", aporteController.get_aporte);
//Update a aporte by Id
router.put("/:aporteId", aporteController.update_aporte);
//Delete a aporte by Id
router.delete("/:aporteId", aporteController.delete_aporte);

module.exports = router;
