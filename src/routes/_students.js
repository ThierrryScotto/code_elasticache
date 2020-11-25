"use strict"

// dependencies
const express = require('./index');

//controllers
const studentRetriveController = require('../controllers/students/retrive.controller.');
const studentPersisteController = require('../controllers/students/persist.controller');

express.router.get('/students', studentRetriveController.getUsers);
express.router.get('/students/:studentId', studentRetriveController.getUserById);
express.router.post('/students', studentPersisteController.createStudent);

module.exports = express.router;