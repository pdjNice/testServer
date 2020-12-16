const express = require("express");
const axios = require("axios");
var router = express.Router();
router.get("/", async (req, res, next) => {
  const data = await axios.get("http://127.0.0.1:86/main/footer");
  console.log("data-----", data.data);
  res.send({
    data: `${data.data}`
  });

});
module.exports = router;
