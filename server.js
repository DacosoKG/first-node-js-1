//ESM
import express from "express";
import axios from "axios";
// import { users } from "./data.js";

// console.log(users);
//CommonJS
// const express = require("express");
const app = express();
const url = "https://66f668e3436827ced97701db.mockapi.io/students";
const port = process.env.PORT || 8000;

app.get("/", async (req, res) => {
  //   res.send({
  //     message: "Welcome to Homepage",
  //     total_Users: users.length,
  //     users: users,
  //   });
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
