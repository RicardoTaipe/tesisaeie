const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const SupplierController = require("../controllers/supplier.controller");

//Show all suppliers
router.get("/", auth, SupplierController.get_all_suppliers);

//Add a new supplier
router.post("/", auth, SupplierController.create_supplier);
//Show a supplier by Id
router.get("/:supplierId", auth, SupplierController.get_supplier);
//Update a supplier by Id
router.put("/:supplierId", auth, SupplierController.update_supplier);
//Delete a supplier by Id
router.delete("/:supplierId", auth, SupplierController.delete_supplier);

module.exports = router;
