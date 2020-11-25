"use strict"

// dependencies
const express = require('./index');

//controllers
const enrollRetriveController = require('../controllers/enrolls/retrive.controller.');
const enrollPersisteController = require('../controllers/enrolls/persist.controller');

express.router.get('/enrolls', enrollRetriveController.getEnrolls);
express.router.get('/enrolls/:enrollId', enrollRetriveController.getEnrollById);
express.router.post('/enrolls', enrollPersisteController.createEnroll);

module.exports = express.router;