const express = require('express');
const router = express.Router();
const userController = require('../controller/users');


router.post('/user', userController.createUser);
router.route('/user/:id').get(userController.getUserById);
router.route('/user').get(userController.getAllUsers);

module.exports = router;