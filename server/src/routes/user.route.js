const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/user.controller");

//Show all users
router.get("/", UsersController.get_all_users);
//Add a new product
router.post("/", UsersController.create_user);
//Show a product by Id
router.get("/:userId", UsersController.get_user);
//Update a product by Id
router.patch("/:userId", UsersController.update_user);
//Delete a product by Id
router.delete("/:userId", UsersController.delete_user);

module.exports = router;
