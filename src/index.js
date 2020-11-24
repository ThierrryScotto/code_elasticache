"use strict"

// dependecies
const router = require('./routes/index');

// routes
const students = require('./routes/_students');

// constant
const basePath = '/v1';

router.express.use(`${basePath}`, students);