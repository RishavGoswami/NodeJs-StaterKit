const express = require("express");
const router = express.Router();
const passport = require("passport");

// User Controllers
const User = require("../controllers/users");

/**
 *    @route    GET v1/api/users/test
 *    @desc     Test users route
 *    @access   Public
 **/

router.get("/all", User.get_all);

/**
 *    @route    POST v1/api/users/register
 *    @desc     Register users
 *    @access   Public
 **/

router.post("/register", User.register);

/**
 *    @route    POST v1/api/users/login
 *    @desc     Login user | Return JWT Token
 *    @access   Public
 **/

router.post("/login", User.login);

/**
 *    @route    POST v1/api/users/current
 *    @desc     Return current user
 *    @access   Private
 **/

router.get(
  "/auth",
  passport.authenticate("jwt", { session: false }),
  User.getCurrentUser
);

module.exports = router;
