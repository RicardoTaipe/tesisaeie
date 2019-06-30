const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const SalesController = require("../controllers/sale.controller");

//Show all sales
router.get("/", auth, SalesController.get_all_sales);

//Add a new sale
router.post("/", auth, SalesController.create_sale);
//Show a sale by Id
router.get("/:saleId", auth, SalesController.get_sale);
//Update a sale by Id
router.patch("/:saleId", auth, SalesController.update_sale);
//Delete a sale by Id
router.delete("/:saleId", auth, SalesController.delete_sale);

module.exports = router;
