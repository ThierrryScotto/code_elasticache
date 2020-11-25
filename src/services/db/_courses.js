"use strict"

// dependencies
const { postgres } = require('common-api').database;

// redis
const redis = require("../../services/elasticache/_redis");

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
  const key     = 'all-courses';
  const courses = await elasticache.getJson(key);   
  
  if (courses) { 
    return courses;
  }

  const query = `
    SELECT 
      * 
    FROM 
      courses
  `;

  const result = await postgres.read.query(query);
  await elasticache.setJson(key, result);

  return result;
};

const getCourseById = async (id) => {
  const key     = `course-${id}`;
  const course = await elasticache.getJson(key);   

  if (course) { 
    return course;
  }

  const query = `
    SELECT 
      * 
    FROM 
      courses
    WHERE 
      id = $1
  `;

  const values = [id];
  const result = await postgres.read.queryFirstOrNull(query, values);
  await elasticache.setJson(key, result);

  return result;
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById
}