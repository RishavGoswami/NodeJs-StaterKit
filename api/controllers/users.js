const gravatar = require("gravatar");

// Get User Model
const User = require("../models/User");

// Helpers
const encryption = require("../../helper");

exports.get_all_users = (req, res) => {
  res.json({
    msg: "Users works"
  });
};

exports.register_user = (req, res) => {
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
