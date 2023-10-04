const express = require('express');
const router = express.Router();
const userController = require('../controller/users');


router.post('/user', userController.createUser);
router.route('/user/:id').get(userController.getUser);

module.exports = router;