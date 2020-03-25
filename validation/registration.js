const Validator = require("validator");
const { isEmpty } = require("../helper");

const validateRegistrationInput = data => {
  let { name, email, password, confirmPassword } = data;
  let errors = {};

  /**
   *      @desc   Validation
   *      @cond   Must not be undefind, null, empty object or string. If yes, set to empty string
   */

  name = !isEmpty(name) ? name : "";
  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";
  confirmPassword = !isEmpty(confirmPassword) ? confirmPassword : "";

  /**
   *      @desc   Name validation while registration
   *      @cond   Must be between 3 & 30 characters and cannot be left blank
   */

  if (!Validator.isLength(name, { min: 3, max: 30 }))
    errors.name = "Name must be between 3 and 30 characters.";
  if (Validator.isEmpty(name)) errors.name = "Name cannot be left blank.";

  /**
   *      @desc   Email validation while registration
   *      @cond   Must be a valid email and cannot be left blank
   */

  if (Validator.isEmpty(email)) errors.email = "Email cannot be left blank.";
  if (!Validator.isEmail(email)) errors.email = "Enter a valid email.";

  /**
   *      @desc   Password validation while registration
   *      @cond   Must be atleast 6 & not more than 30 characters and cannot be left blank
   */

  if (Validator.isEmpty(password))
    errors.password = "Password cannot be left blank.";
  if (!Validator.isLength(password, { min: 6, max: 30 }))
    errors.password = "Password must be between 3 and 30 characters.";

  /**
   *      @desc   Confirm Password validation while registration
   *      @cond   Must match with password and cannot be left blank
   */

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
