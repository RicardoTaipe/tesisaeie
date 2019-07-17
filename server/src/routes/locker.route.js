const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const LockerController = require("../controllers/locker.controller");

//Show all lockers
router.get("/", LockerController.get_all_lockers);
//Add a new locker
router.post("/", auth, LockerController.create_locker);
//Show a locker by Id
router.get("/:lockerId", auth, LockerController.get_locker);
//Update a locker by Id
router.put("/:lockerId", auth, LockerController.update_locker);
//Delete a locker by Id
router.delete("/:lockerId", auth, LockerController.delete_locker);
//Alquilar
router.put(
  "/:lockerId/student/:studentId",
  auth,
  LockerController.alquilar_locker
);
//Terminar alquiler
router.delete(
  "/:lockerId/student/:studentId",
  auth,
  LockerController.terminar_alquiler
);
//Notificard
router.post("/notify", auth, LockerController.notify_locker);
module.exports = router;
