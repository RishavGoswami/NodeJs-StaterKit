require("dotenv").config();

const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("Hello"));

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.listen(PORT, HOST, () =>
  console.log(`Server is up and listening to ${HOST}:${PORT}`)
);
