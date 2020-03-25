const Validator = require("validator");
const { isEmpty } = require("../helper");

const validateLoginInput = data => {
  let { email, password } = data;
  let errors = {};

  /**
   *      @desc   Validation
   *      @cond   Must not be undefind, null, empty object or string. If yes, set to empty string
   */

  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";

  /**
   *      @desc   Email validation on login
   *      @cond   Must be a valid email and cannot be left blank
   */

  if (!Validator.isEmail(email)) errors.email = "Enter a valid email.";
  if (Validator.isEmpty(email)) errors.email = "Email cannot be left blank.";

  /**
   *      @desc   Password validation on login
   *      @cond   Cannot be left blank.
   */

  if (Validator.isEmpty(password))
    errors.password = "Password cannot be left blank.";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateLoginInput;
