"use strict"

// dependencies
const { postgres } = require('common-api').database;

// redis
const elasticache = require("../../services/elasticache/_redis");

const createStudent = async (idEnroll) => {
  const query = `
    INSERT INTO students 
      (id_enroll)
    VALUES 
      ($1) 
    RETURNING *;
  `;

  const values = [idEnroll];
  return await postgres.read.queryFirstOrNull(query, values);
};

const getStudents = async () => {
  const key     = 'all-students';
  const students = await elasticache.getJson(key);   

  if (students) { 
    return students;
  }

  const query = `
    SELECT 
      * 
    FROM 
      students
  `;

  const result = await postgres.read.query(query);
  await elasticache.setJson(key, result);

  return result;
};

const getStudentsById = async (id) => {
  const key     = `student-${id}`;
  const student = await elasticache.getJson(key);   

  if (student) { 
    return student;
  }

  const query = `
    SELECT 
      * 
    FROM 
      students
    WHERE 
      id = $1
  `;

  const values = [id];
  const result = await postgres.read.queryFirstOrNull(query, values);
  await elasticache.setJson(key, result);

  return result;
};

module.exports = {
  createStudent,
  getStudentsById,
  getStudents
}