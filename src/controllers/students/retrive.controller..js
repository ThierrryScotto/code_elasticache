"use strict"

// Database
const userDB = require("../../services/db/_students");

const getStudents = async (req, res) => {
  const students = await userDB.getStudents();

  if (!students) {
    return res.status(404).send({ message: "No Student found " });
  }

  return res.status(200).send(students);
}

const getStudentsById = async (req, res) => {
  const { studentId } = req.params;

  const user = await userDB.getStudentsById(studentId);

  if (!user) {
    return res.status(404).send({ message: `Student ${studentId} not found` });
  }

  return res.status(200).send(user);
}

module.exports = {
  getStudentsById,
  getStudents
}