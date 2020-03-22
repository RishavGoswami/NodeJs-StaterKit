const express = require("express");
const router = express.Router();

// User Controllers
const RegisterUser = require("../controllers/users");

/**
 *    @route    GET v1/api/users/test
 *    @desc     Test users route
 *    @access   Public
 **/

router.get("/all", RegisterUser.get_all_users);

/**
 *    @route    GET v1/api/users/register
 *    @desc     Register users
 *    @access   Public
 **/

router.post("/register", RegisterUser.register_user);

module.exports = router;
