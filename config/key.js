module.exports = {
  mongoURI: process.env.MONGO_DB_URI,
  jwtSecret: process.env.JWT_SECRET,
  tokenExpiresIn: process.env.TOKEN_EXPIRES_IN
};
