"use strict"

// DB
const userDB = require("../../services/db/_student");

const getUsers = async (req, res) => {
  const users = await userDB.getUsers();

  if (!users) {
    return res.status(404).send({ message: "No user found " });
  }

  return res.status(200).send(users);
}

const getUserById = async (req, res) => {
  const { studentId } = req.params;

  const user = await userDB.getUserById(studentId);

  if (!user) {
    return res.status(404).send({ message: `User ${studentId} not found` });
  }

  return res.status(200).send(user);
}

module.exports = {
  getUserById,
  getUsers
}