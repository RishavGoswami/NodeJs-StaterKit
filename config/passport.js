const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const chalk = require("chalk");

const mongoose = require("mongoose");
const User = mongoose.model("users");

const keyConfig = require("./key");

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keyConfig.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, (jwtPayload, done) => {
      const { id } = jwtPayload;
      User.findById(id)
        .then(user => {
          if (user) done(null, user);
          return done(null, false);
        })
        .catch(err =>
          console.log(chalk.bold.red(`Error in authentication ${err}`))
        );
    })
  );
};
