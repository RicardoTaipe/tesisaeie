const express = require("express");
const router = express.Router();

const SalesController = require("../controllers/sale.controller");

//Show all sales
router.get("/", SalesController.get_all_sales);

//Add a new sale
router.post("/", SalesController.create_sale);
//Show a sale by Id
router.get("/:saleId", SalesController.get_sale);
//Update a sale by Id
router.patch("/:saleId", SalesController.update_sale);
//Delete a sale by Id
router.delete("/:saleId", SalesController.delete_sale);

module.exports = router;
