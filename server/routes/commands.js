const express = require('express');
const router = express.Router();
const commandController = require('../controller/commands');


router.post('/command', commandController.createCommand);
router.route('/command/:id').get(commandController.getCommandById);
router.route('/command').get(commandController.getAllCommands);
router.patch('/command/:id/confirm', commandController.confirmCommand);
router.put('/command/:id', commandController.updateCommand);

module.exports = router;