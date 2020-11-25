"use strict"

// Database
const courseDB = require("../../services/db/_courses");

const getCourses = async (req, res) => {
  const courses = await courseDB.getCourses();

  if (!courses) {
    return res.status(404).send({ message: "courses not found" });
  }

  return res.status(200).send(courses);
}

const getCourseById = async (req, res) => {
  const { courseId } = req.params;

  const course = await courseDB.getCourseById(courseId);

  if (!course) {
    return res.status(404).send({ message: `Course ${courseId} not found` });
  }

  return res.status(200).send(course);
}

module.exports = {
  getCourseById,
  getCourses
}