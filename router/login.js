const express = require("express");
var router = express.Router();
router.get("/", (req, res, next) => {
  res.send({
    msg: "home"
  });
});
module.exports = router;
