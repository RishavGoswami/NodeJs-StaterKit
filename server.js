const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();

// import routes
const users = require("./api/routes/users");
const posts = require("./api/routes/posts");
const profile = require("./api/routes/profile");

const app = express();

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/key").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("Mongo DB connected successfully."))
  .catch(err => console.log(`Oops!!! Something went wrong ${err}`));

/**
 *    @route    GET /
 *    @desc     Test Default route
 *    @access   Public
 **/

app.get("/", (req, res) => res.send("The server is up and running 😀"));

// Use routes
app.use("/v1/api/users", users);
app.use("/v1/api/profile", profile);
app.use("/v1/api/posrt", posts);

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.listen(PORT, HOST, () =>
  console.log(`Server is up and listening to ${HOST}:${PORT}`)
);
