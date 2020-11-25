"use strict"

// dependencies
const express = require('./index');

//controllers
const courseRetriveController = require('../controllers/courses/retrive.controller.');
const coursePersisteController = require('../controllers/courses/persist.controller');

express.router.get('/courses', courseRetriveController.getCourses);
express.router.get('/courses/:courseId', courseRetriveController.getCourseById);
express.router.post('/courses', coursePersisteController.createCourse);

module.exports = express.router;