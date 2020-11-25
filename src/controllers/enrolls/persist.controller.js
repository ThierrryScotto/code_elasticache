"use strict"

// dependencies 
const { validator, response, error }  = require('common-api');

// Database
const enrollDB = require('../../services/db/_enrolls');

// private
const _validateBody = (body) => {
  const registerSchema = {
    'id'  : '/RegisterEnroll',
    'type': 'object',
    'properties': {
      'name'       : { 'type': 'string' },
      'address'    : { 'type': 'string' },
      'document'   : { 'type': 'string' },
      'fatherName' : { 'type': 'string' },
      'matherName' : { 'type': 'string' }
    },
    'required': ['name', 'address', 'document', 'fatherName', 'matherName']
  };
  return validator.validate(registerSchema, body);
};

const createEnroll = async (req, res) => {
  const postBody = _validateBody(req.body);
  
  try {  
    const createUser = await enrollDB.createEnroll(postBody);

    return response.success(res, createUser, 201);
  } catch (err) {
    throw new error.HttpError('Internal error', 500, 'status-code-500_internal-error');
  }
};

module.exports = {
  createEnroll
}