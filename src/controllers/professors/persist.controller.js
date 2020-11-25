"use strict"

// dependencies 
const { validator, response, error }  = require('common-api');

// Database
const enrollDB    = require('../../services/db/_enrolls');
const professorDB = require("../../services/db/_professors");

// private
const _validateBody = (body) => {
  const registerSchema = {
    'id'  : '/RegisterProfessor',
    'type': 'object',
    'properties': {
      'enrollId': { 'type': 'number' }
    },
    'required': ['enrollId']
  };
  return validator.validate(registerSchema, body);
};

const createProfessor = async (req, res) => {
  const postBody = _validateBody(req.body);
  
  try {
    const enroll = await enrollDB.getEnrollById(postBody.enrollId);
    
    if (!enroll) {
      throw new error.HttpError(`Enroll ${postBody.enrollId} not found`, 404, 'status-code-409_enroll-not-found');
    }
  
    const createdProfessor = await professorDB.createProfessor(enroll.id);

    return response.success(res, createdProfessor, 201);
  } catch (err) {
    throw new error.HttpError('Internal error', 500, 'status-code-500_internal-error');
  }
};

module.exports = {
  createProfessor
}