"use strict"

// Database
const professor = require("../../services/db/_professors");

const getProfessors = async (req, res) => {
  const professors = await professor.getProfessors();

  if (!professors) {
    return res.status(404).send({ message: "Professor not found" });
  }

  return res.status(200).send(professors);
}

const getProfessorById = async (req, res) => {
  const { professorId } = req.params;

  const user = await professor.getProfessorById(professorId);

  if (!user) {
    return res.status(404).send({ message: `Professor ${professorId} not found` });
  }

  return res.status(200).send(user);
}

module.exports = {
  getProfessorById,
  getProfessors
}