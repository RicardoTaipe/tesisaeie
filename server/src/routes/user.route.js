const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const UsersController = require("../controllers/user.controller");

//Show all users
router.get("/",auth, UsersController.get_all_users);
//Add a new product
router.post("/",auth, UsersController.create_user);
//Show a product by Id
router.get("/:userId",auth, UsersController.get_user);
//Update a product by Id
router.patch("/:userId",auth, UsersController.update_user);
//Delete a product by Id
router.delete("/:userId",auth, UsersController.delete_user);
//login user
router.post('/login', UsersController.login);

module.exports = router;

