"use strict"

// dependencies
const { postgres } = require('common-api').database;

// redis
const redis = require("../../services/elasticache/_redis");

const createEnroll = async (enroll) => {
  const query = `
    INSERT INTO enrolls 
      (name, address, father_name, mather_name, "document")
    VALUES 
      ($1, $2, $3, $4, $5) 
    RETURNING *;
  `;

  const values = [enroll.name, enroll.address, enroll.fatherName, enroll.matherName, enroll.document];
  return await postgres.read.queryFirstOrNull(query, values);
};

const getEnrolls = async () => {
  const key     = 'all-enrolls';
  const enrolls = await elasticache.getJson(key);   

  if (enrolls) { 
    return enrolls;
  }

  const query = `
    SELECT 
      * 
    FROM 
      enrolls
  `;

  const result = await postgres.read.query(query);
  await elasticache.setJson(key, result);

  return result;
};

const getEnrollById = async (id) => {
  const key     = `enroll-${id}`;
  const enroll  = await elasticache.getJson(key);   

  if (enroll) { 
    return enroll;
  }

  const query = `
    SELECT 
      * 
    FROM 
      enrolls
    WHERE 
      id = $1
  `;

  const values = [id];
  const result = await postgres.read.queryFirstOrNull(query, values);
  await elasticache.setJson(key, result);

  return result;
};

module.exports = {
  createEnroll,
  getEnrollById,
  getEnrolls
}