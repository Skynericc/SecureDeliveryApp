const express = require('express');
const router = express.Router();
const commandController = require('../controller/commands');


router.post('/command', commandController.createCommand);
router.route('/command/:id').get(commandController.getCommand);

module.exports = router;