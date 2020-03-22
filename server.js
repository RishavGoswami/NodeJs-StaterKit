const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

const app = express();

// DB Config
const db = require("./config/key").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("Mongo DB connected successfully."))
  .catch(err => console.log(`Oops!!! Something went wrong ${err}`));

// default URL
app.get("/", (req, res) => res.send("Hello"));

// Use routes
app.use("/v1/api/users", users);
app.use("/v1/api/profile", profile);
app.use("/v1/api/posrt", posts);

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.listen(PORT, HOST, () =>
  console.log(`Server is up and listening to ${HOST}:${PORT}`)
);
