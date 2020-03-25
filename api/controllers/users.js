const gravatar = require("gravatar");
const chalk = require("chalk");

// Get User Model
const User = require("../models/User");

// Input Validations
const {
  validateRegistrationInput,
  validateLoginInput
} = require("../../validation");

// Helper methods
const { passwordToHash, validatePassword } = require("../../helper");

//   @desc Get all users
exports.get_all = (req, res) => {
  User.find({}, (err, userList) => {
    if (userList) res.json(userList);
    if (err) throw err;
  });
};

//   @desc Register a user
exports.register = (req, res) => {
  const { errors, isValid } = validateRegistrationInput(req.body);
  const { name, email, password } = req.body;

  if (!isValid) return res.status(400).json(errors);

  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.email = "Email already exist.";
        return res.status(400).json(errors);
      }
      const avatar = gravatar.url(email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });
      const userToRegister = new User({
        name,
        email,
        password,
        avatar
      });

      // Encrypt the plain password to hash password
      passwordToHash(userToRegister, res);
    })
    .catch(err => {
      errors.error = "Something went wrong";
      res.status(500).json(errors);
      console.log(chalk.bold.red(`Registration error ${err}`));
    });
};

//    @desc   Login user
exports.login = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  const { email, password } = req.body;

  if (!isValid) return res.status(400).json(errors);

  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }

      validatePassword(password, user, res);
    })
    .catch(err => {
      errors.success = false;
      errors.message = "Something went wrong";
      res.status(500).json(errors);
      console.log(chalk.bold.red(`Login error ${err}`));
    });
};

//    @desc   Authenticate user
exports.authenticateUser = (req, res) => {
  const {
    user: { name, email, avatar }
  } = req;
  const userResponse = {
    name,
    email,
    avatar
  };
  res.json(userResponse);
};
