"use strict"

// dependencies 
const { validator, response, error }  = require('common-api');

// Database
const courseDB = require('../../services/db/_courses');

// private
const _validateBody = (body) => {
  const registerSchema = {
    'id'  : '/RegisterEnroll',
    'type': 'object',
    'properties': {
      'name'   : { 'type': 'string' },
      'dateN1' : { 'type': 'string' },
      'dateN2' : { 'type': 'string' },
      'status' : { 'type': 'string' }
    },
    'required': ['name', 'dateN1', 'dateN2']
  };
  return validator.validate(registerSchema, body);
};

const createCourse = async (req, res) => {
  const postBody = _validateBody(req.body);
  
  try {  
    const createdCrouse = await courseDB.createCourse(postBody);

    return response.success(res, createdCrouse, 201);
  } catch (err) {
    throw new error.HttpError('Internal error', 500, 'status-code-500_internal-error');
  }
};

module.exports = {
  createCourse
}