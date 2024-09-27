//ESM
import express from "express";
//CommonJS
// const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

app.get("/", async (req, res) => {
  res.send("Welcome to Home Page!!!!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
