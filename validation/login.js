const Validator = require("validator");
const { isEmpty } = require("../helper");

const validateLoginInput = data => {
  let { email, password } = data;
  let errors = {};

  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";

  if (!Validator.isEmail(email)) errors.email = "Enter a valid email.";
  if (Validator.isEmpty(email)) errors.email = "Email cannot be left blank.";

  if (Validator.isEmpty(password))
    errors.password = "Password cannot be left blank.";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateLoginInput;
