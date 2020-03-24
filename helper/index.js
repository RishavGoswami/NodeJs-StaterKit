const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keyConfig = require("../config/key");

// Convert the plain password to encrypted hash password
exports.passwordToHash = (newUser, res) =>
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      return newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(`Error in users ${err}`));
    });
  });
//  Convert hash password and check for user in DB
exports.checkPassword = (password, user, res) =>
  bcrypt.compare(password, user.password).then(isPassowrdMatched => {
    if (isPassowrdMatched) {
      const { id, name, email, avatar } = user;
      jwtPayload = {
        id,
        name,
        email,
        avatar
      };

      const { secretOrKey, expiresIn } = keyConfig;
      // Sign Token
      return jwt.sign(jwtPayload, secretOrKey, { expiresIn }, (err, token) => {
        res.json({
          success: true,
          token: `Bearer ${token}`,
          message: "Login was successful."
        });
        if (err)
          return res.status(500).json({ message: "Something went wrong!" });
      });
    }
    return res.status(400).json({ password: "Password incorrect" });
  });
