const express = require('express');
const router = express.Router();

const RolesController = require('../controllers/role.controller');
//const auth = require('../middleware/auth');

//Show all roles
router.get("/", RolesController.get_all_roles);

//Add a new role
router.post('/', RolesController.create_role);
//Show a role by Id
router.get('/:roleId', RolesController.get_role);
//Update a role by Id
router.patch("/:roleId",RolesController.update_role);
//Delete a role by Id
router.delete("/:roleId",RolesController.delete_role);



module.exports = router;