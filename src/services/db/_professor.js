"use strict"

// dependencies
const { postgres } = require('common-api').database;

const createProfessor = async (idEnroll) => {
  const query = `
    INSERT INTO professors 
      (id_enroll)
    VALUES 
      ($1) 
    RETURNING *;
  `;

  const values = [idEnroll];
  return await postgres.read.queryFirstOrNull(query, values);
};

const getProfessor = async () => {
  const query = `
    SELECT 
      * 
    FROM 
      professors
  `;

  return await postgres.read.query(query);
};

const getProfessorById = async (id) => {
  const query = `
    SELECT 
      * 
    FROM 
      professors
    WHERE 
      id = $1
  `;

  const values = [id];
  return await postgres.read.queryFirstOrNull(query, values);
};

module.exports = {
  createProfessor,
  getProfessorById,
  getProfessor
}