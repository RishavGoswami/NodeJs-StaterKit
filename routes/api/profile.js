const express = require("express");
const router = express.Router();

/*
 *    @route    GET v1/api/profile/test
 *    @desc     Test profile route
 *    @access   Private
 */

router.get("/test", (req, res) => {
  res.json({
    msg: "Profile works"
  });
});

module.exports = router;
