"use strict"

// dependencies
const express = require('./index');

//controllers
const studentRetriveController = require('../controllers/students/retrive.controller.');
const studentPersisteController = require('../controllers/students/persist.controller');

express.router.get('/students', studentRetriveController.getStudents);
express.router.get('/students/:studentId', studentRetriveController.getStudentsById);
express.router.post('/students', studentPersisteController.createStudent);

module.exports = express.router;