"use strict"

// dependencies
const express = require('./index');

//controllers
const studentPersisteController = require('../controllers/students/retrive.controller.');

express.router.get('/students', studentPersisteController.getUsers);
express.router.get('/students/:studentId', studentPersisteController.getUserById);

module.exports = express.router;