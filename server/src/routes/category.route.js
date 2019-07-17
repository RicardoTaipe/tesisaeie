const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const CategoryController = require("../controllers/category.controller");

//Show all categories
router.get("/", auth, CategoryController.get_all_categories);
//Add a new category
router.post("/", auth, CategoryController.create_category);
//Show a category by Id
router.get("/:categoryId", auth, CategoryController.get_category);
//Update a category by Id
router.put("/:categoryId", auth, CategoryController.update_category);
//Delete a category by Id
router.delete("/:categoryId", auth, CategoryController.delete_category);

module.exports = router;
