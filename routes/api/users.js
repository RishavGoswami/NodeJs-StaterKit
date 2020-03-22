const express = require("express");
const router = express.Router();

/*
 *    @route    GET v1/api/users/test
 *    @desc     Test users route
 *    @access   Public
 */

router.get("/test", (req, res) => {
  res.json({
    msg: "Users works"
  });
});

module.exports = router;
