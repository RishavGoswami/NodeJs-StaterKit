module.exports = {
  mongoURI: process.env.MONGO_DB_URI,
  secretOrKey: process.env.JWT_SECRET,
  expiresIn: process.env.TOKEN_EXPIRES_IN
};
