const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keyConfig = require("../config/key");

// Convert the plain password to encrypted hash password
const passwordToHash = (newUser, res) =>
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
const validatePassword = (password, user, res) =>
  bcrypt.compare(password, user.password).then(isPassowrdMatched => {
    if (isPassowrdMatched) {
      const { id, name, email, avatar } = user;
      jwtPayload = {
        id,
        name,
        email,
        avatar
      };

      return validateTokenOwner(jwtPayload, res);
    }
    return res.status(400).json({ password: "Password incorrect" });
  });

const validateTokenOwner = (jwtPayload, res) => {
  const { secretOrKey, expiresIn } = keyConfig;
  return jwt.sign(jwtPayload, secretOrKey, { expiresIn }, (err, token) => {
    const successEntity = {
      success: true,
      token: `Bearer ${token}`,
      message: "Login was successful."
    };
    res.json(successEntity);
    if (err) return res.status(500).json({ message: "Something went wrong!" });
  });
};

const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

module.exports = {
  passwordToHash,
  validatePassword,
  isEmpty
};
