const Validator = require("validator");
const { isEmpty } = require("../helper");

const validateRegistrationInput = data => {
  let { name, email, password, confirmPassword } = data;
  let errors = {};

  name = !isEmpty(name) ? name : "";
  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";
  confirmPassword = !isEmpty(confirmPassword) ? confirmPassword : "";

  if (!Validator.isLength(name, { min: 3, max: 30 }))
    errors.name = "Name must be between 3 and 30 characters.";
  if (Validator.isEmpty(name)) errors.name = "Name cannot be left blank.";

  if (Validator.isEmpty(email)) errors.email = "Email cannot be left blank.";
  if (!Validator.isEmail(email)) errors.email = "Enter a valid email.";

  if (Validator.isEmpty(password))
    errors.password = "Password cannot be left blank.";
  if (!Validator.isLength(password, { min: 6, max: 30 }))
    errors.password = "Password must be between 3 and 30 characters.";

  if (Validator.isEmpty(confirmPassword))
    errors.confirmPassword = "Confirm password cannot be left blank.";

  if (!Validator.equals(password, confirmPassword))
    errors.confirmPassword = "Password's doesn't match.";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateRegistrationInput;
