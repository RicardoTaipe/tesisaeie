const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const ProductsController = require("../controllers/product.controller");

//Show all products
router.get("/", ProductsController.get_all_products);

//Add a new product
router.post("/", auth, ProductsController.create_product);
//Show a product by Id
router.get("/:productId", ProductsController.get_product);
//Update a product by Id
router.put("/:productId", auth, ProductsController.update_product);
//Delete a product by Id
router.delete("/:productId", auth, ProductsController.delete_product);

module.exports = router;
