const express = require("express");
const router = express.Router();

const SupplierController = require("../controllers/supplier.controller");

//Show all suppliers
router.get("/", SupplierController.get_all_suppliers);

//Add a new supplier
router.post("/", SupplierController.create_supplier);
//Show a supplier by Id
router.get("/:supplierId", SupplierController.get_supplier);
//Update a supplier by Id
router.patch("/:supplierId", SupplierController.update_supplier);
//Delete a supplier by Id
router.delete("/:supplierId", SupplierController.delete_supplier);

module.exports = router;
