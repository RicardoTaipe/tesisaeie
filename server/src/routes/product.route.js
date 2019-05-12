const express = require("express");
const router = express.Router();

const ProductsController = require("../controllers/product.controller");

//Show all products
router.get("/", ProductsController.get_all_products);

//Add a new product
router.post("/", ProductsController.create_product);
//Show a product by Id
router.get("/:productId", ProductsController.get_product);
//Update a product by Id
router.patch("/:productId", ProductsController.update_product);
//Delete a product by Id
router.delete("/:productId", ProductsController.delete_product);

module.exports = router;
