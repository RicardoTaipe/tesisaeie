const express = require("express");
const router = express.Router();

const LockerController = require("../controllers/locker.controller");

//Show all lockers
router.get("/", LockerController.get_all_lockers);
//Add a new locker
router.post("/", LockerController.create_locker);
//Show a locker by Id
router.get("/:lockerId", LockerController.get_locker);
//Update a locker by Id
router.put("/:lockerId", LockerController.update_locker);
//Delete a locker by Id
router.delete("/:lockerId", LockerController.delete_locker);
//Alquilar
router.put("/:lockerId/student/:studentId", LockerController.alquilar_locker);
//Terminar alquiler
router.delete("/:lockerId/student/:studentId", LockerController.terminar_alquiler);
module.exports = router;
