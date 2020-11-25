"use strict"

// dependecies
const router = require('./routes/index');

// routes
const students = require('./routes/_students');
const enrolls  = require('./routes/_enrolls');

// constant
const basePath = '/v1';

router.express.use(`${basePath}`, students);
router.express.use(`${basePath}`, enrolls);