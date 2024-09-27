//ESM
import express from "express";
import { users } from "./data.js";

console.log(users);
//CommonJS
// const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

app.get("/", async (req, res) => {
  res.send({
    message: "Welcome to Homepage",
    total_Users: users.length,
    users: users,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
