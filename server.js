const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const chalk = require("chalk");

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
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(chalk.bold.green("Mongo DB connected successfully.")))
  .catch(err => console.log(chalk.red`Oops!!! Something went wrong ${err}`));

// Passport middleware
app.use(passport.initialize());
// Config
require("./config/passport")(passport);

// Use routes
app.use("/v1/api/users", users);
app.use("/v1/api/profile", profile);
app.use("/v1/api/posrt", posts);

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.listen(PORT, HOST, () =>
  console.log(
    chalk.bold.yellow(`Server is up and listening to ${HOST}:${PORT}`)
  )
);
