"use strict"

// dependencies
const { postgres } = require('common-api').database;

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
  const query = `
    SELECT 
      * 
    FROM 
      enrolls
  `;

  return await postgres.read.query(query);
};

const getEnrollById = async (id) => {
  const query = `
    SELECT 
      * 
    FROM 
      enrolls
    WHERE 
      id = $1
  `;

  const values = [id];
  return await postgres.read.queryFirstOrNull(query, values);
};

module.exports = {
  createEnroll,
  getEnrollById,
  getEnrolls
}