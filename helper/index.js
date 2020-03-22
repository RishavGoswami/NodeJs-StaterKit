const bcrypt = require("bcryptjs");

/**
 *      @desc   Convert the plain password to encrypted hash password
 **/

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
