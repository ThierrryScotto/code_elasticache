"use strict"

// dependencies
const { postgres } = require('common-api').database;

const getUsers = async () => {
  const query = `
    SELECT 
      * 
    FROM 
      students
  `;

  return await postgres.read.query(query);
};

const getUserById = async (id) => {
  const query = `
    SELECT 
      * 
    FROM 
      students
    WHERE 
      id = $1
  `;

  const values = [id];
  return await postgres.read.queryFirstOrNull(query, values);
};

module.exports = {
  getUserById,
  getUsers
}