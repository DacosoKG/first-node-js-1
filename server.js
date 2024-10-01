import express from "express";
import axios from "axios";
import "dotenv/config";
import { v4 as uuidv4 } from "uuid";

//* import{readFile, writeFile} from "node:fs/promises"

//ESM
// import { users } from "./data.js";
// require('dotenv').config()
// console.log(users);
//CommonJS
// const express = require("express");
const app = express();
const url = "https://66f668e3436827ced97701db.mockapi.io/students/";
const port = process.env.PORT || 8000;

app.use(express.json());

//! GET

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Homepage",
  });
});

app.get("/students", async (req, res) => {
  try {
    const response = await axios.get(url);
    res.status(200).json({
      message: "List of Students",
      total_Students: response.data.length,
      students: response.data,
    });
  } catch (error) {
    res.status(400).json({
      message: "Data not found",
    });
  }
});

app.get("/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(url + id);

    const data = await response.json();
    res.status(200).json({
      message: "Student Found",
      student: data,
    });
  } catch (error) {
    res.status(400).json({
      message: "Data not found",
    });
  }
});

//! DELETE

app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.delete(url + id);

    const deletedStudent = response.data.find((student) => student.id == id);
    const newData = response.data.filter((student) => student.id != id);

    response.data = newData;

    res.status(200).json({
      message: "Student has been deleted",
      deletedStudent: deletedStudent,
    });
  } catch (error) {
    res.status(400).json({
      message: "Data not found",
    });
  }
});

//! POST

app.post("/students", async (req, res) => {
  const newStudent = req.body;
  newStudent.id = uuidv4();
  try {
    const response = await axios.post(url, newStudent);

    response.data.push(newStudent);

    res.status(200).json({
      message: "Student has been successfully added",
      student: response.data,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error adding student",
    });
  }
});

//! LISTEN

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
