const gravatar = require("gravatar");

// Get User Model
const User = require("../models/User");

// Helpers
const encryption = require("../../helper");

//   @desc Get all users
exports.get_all = (req, res) => {
  res.json({
    msg: "Users works"
  });
};

//   @desc Register a user
exports.register = (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exist" });
    }
    const avatar = gravatar.url(email, {
      s: "200", // Size
      r: "pg", // Rating
      d: "mm" // Default
    });
    const newUser = new User({
      name,
      email,
      password,
      avatar
    });

    // Encrypt the plain password to hash password
    encryption.passwordToHash(newUser, res);
  });
};

//    @desc   Login user
exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) return res.status(404).json({ email: "User not found." });

      encryption.checkPassword(password, user, res);
    })
    .catch(err => console.log(`Login error ${err}`));
};
