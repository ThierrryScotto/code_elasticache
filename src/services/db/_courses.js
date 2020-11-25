"use strict"

// dependencies
const { postgres } = require('common-api').database;

const createCourse = async (course) => {
  const query = `
    INSERT INTO courses 
      (name, date_n1, date_n2)
    VALUES 
      ($1, $2, $3) 
    RETURNING *;
  `;

  const values = [course.name, course.dateN1, course.dateN2];
  return await postgres.read.queryFirstOrNull(query, values);
};

const getCourses = async () => {
  const query = `
    SELECT 
      * 
    FROM 
      courses
  `;

  return await postgres.read.query(query);
};

const getCourseById = async (id) => {
  const query = `
    SELECT 
      * 
    FROM 
      courses
    WHERE 
      id = $1
  `;

  const values = [id];
  return await postgres.read.queryFirstOrNull(query, values);
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById
}