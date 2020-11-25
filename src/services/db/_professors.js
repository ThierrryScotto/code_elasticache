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

const getProfessors = async () => {
  const key        = 'all-professors';
  const professors = await elasticache.getJson(key);   

  if (professors) { 
    return professors;
  }
  const query = `
    SELECT 
      * 
    FROM 
      professors
  `;

  const result = await postgres.read.query(query);
  await elasticache.setJson(key, result);

  return result;
};

const getProfessorById = async (id) => {
  const key        = `professor-${id}`;
  const professor  = await elasticache.getJson(key);   

  if (professor) { 
    return professor;
  }

  const query = `
    SELECT 
      * 
    FROM 
      professors
    WHERE 
      id = $1
  `;

  const values = [id];
  const result = await postgres.read.queryFirstOrNull(query, values);
  await elasticache.setJson(key, result);

  return result;
};

module.exports = {
  createProfessor,
  getProfessorById,
  getProfessors
}