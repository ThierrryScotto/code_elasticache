"use strict"

// dependencies
const express = require('./index');

//controllers
const professorRetriveController = require('../controllers/professors/retrive.controller.');
const professorPersisteController = require('../controllers/professors/persist.controller');

express.router.get('/professors', professorRetriveController.getProfessors);
express.router.get('/professors/:professorId', professorRetriveController.getProfessorById);
express.router.post('/professors', professorPersisteController.createProfessor);

module.exports = express.router;