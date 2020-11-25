"use strict"

// Database
const professor = require("../../services/db/_professor");

const getProfessors = async (req, res) => {
  const users = await professor.getProfessors();

  if (!users) {
    return res.status(404).send({ message: "No user found " });
  }

  return res.status(200).send(users);
}

const getProfessorById = async (req, res) => {
  const { studentId } = req.params;

  const user = await professor.getProfessorById(studentId);

  if (!user) {
    return res.status(404).send({ message: `User ${studentId} not found` });
  }

  return res.status(200).send(user);
}

module.exports = {
  getProfessorById,
  getProfessors
}