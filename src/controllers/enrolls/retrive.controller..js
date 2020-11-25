"use strict"

// Database
const enrollDB = require("../../services/db/_enrolls");

const getEnrolls = async (req, res) => {
  const enrolls = await enrollDB.getEnrolls();

  if (!enrolls) {
    return res.status(404).send({ message: "No enrolls found " });
  }

  return res.status(200).send(enrolls );
}

const getEnrollById = async (req, res) => {
  const { enrollId } = req.params;

  const enroll = await enrollDB.getEnrollById(enrollId);

  if (!enroll) {
    return res.status(404).send({ message: `Enroll ${enrollId} not found` });
  }

  return res.status(200).send(enroll);
}

module.exports = {
  getEnrollById,
  getEnrolls
}