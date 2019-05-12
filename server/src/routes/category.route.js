const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/category.controller");

//Show all categories
router.get("/", CategoryController.get_all_categories);
//Add a new category
router.post("/", CategoryController.create_category);
//Show a category by Id
router.get("/:categoryId", CategoryController.get_category);
//Update a category by Id
router.patch("/:categoryId", CategoryController.update_category);
//Delete a category by Id
router.delete("/:categoryId", CategoryController.delete_category);

module.exports = router;
