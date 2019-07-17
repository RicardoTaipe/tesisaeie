const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const aporteController = require("../controllers/aporte.controller");

//Show all aportes
router.get("/", auth, aporteController.get_all_aportes);
//Add a new aporte
router.post("/", auth, aporteController.create_aporte);
//Show a aporte by Id
router.get("/:aporteId", auth, aporteController.get_aporte);
//Update a aporte by Id
router.put("/:aporteId", auth, aporteController.update_aporte);
//Delete a aporte by Id
router.delete("/:aporteId", auth, aporteController.delete_aporte);

module.exports = router;
