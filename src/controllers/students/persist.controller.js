"use strict"

// dependencies 
const { validator, response, error, logger }  = require('common-api');

// Database
const enrollDB = require('../../services/db/_enrolls');
const userDB = require("../../services/db/_students");

// private
const _validateBody = (body) => {
  const registerSchema = {
    'id'  : '/RegisterUser',
    'type': 'object',
    'properties': {
      'enrollId': { 'type': 'number' }
    },
    'required': ['enrollId']
  };
  return validator.validate(registerSchema, body);
};

const createStudent = async (req, res) => {
  const postBody = _validateBody(req.body);
  
  try {
    const enroll = await enrollDB.getEnrollById(postBody.enrollId);
    
    if (!enroll) {
      throw new error.HttpError(`Enroll ${postBody.enrollId} not found`, 404, 'status-code-409_enroll-not-found');
    }
  
    const createUser = await userDB.createStudent(enroll.id);

    return response.success(res, createUser, 201);
  } catch (err) {
    throw new error.HttpError('Internal error', 500, 'status-code-500_internal-error');
  }
};

module.exports = {
  createStudent
}