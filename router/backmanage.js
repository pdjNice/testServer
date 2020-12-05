const express = require("express");
const router = express.Router();
const config = require("../config");
const axios = require("axios");
const { updataToken } = require("../util/fileOption");
//appid:wx7455d2a7ee27c3fc
//20a03361e4409cc742bfefb963be6fbb
//https请求方式: GET https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
router.get("/getAccessToken", async (req, res, next) => {
  // access_token: '39_Sc8CS-ZvDAqqmAiQyLgGcGca5fuV9dHezPBQa-AR3-K42_e82cpyIk86bKYJWkQ2NZoUtvtjcFDs-pJxR4VJ3AMlt6B3L8MdYv8nFMu_mIcIonHOzlvycesAifAcfajhVVQwSsvpvKd0qBbNZAEcAFAQRV',
  //   expires_in: 7200
  try {
    axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appid}&secret=${config.secret}`).then((result) => {
      console.log("res", result)
    });
    res.send({ msg: "getaccesstoken", data });
  } catch (err) {
    res.send({ msg: "err", err });
  }
});

router.get("/saveAccessToken", async (req, res, next) => {
  // const tokenPath = path.resolve(__dirname, "token.json");
  // try {
  //   if (fs.existsSync(tokenPath)) {
  //     console.log('该路径已存在');
  //     fs.unlinkSync(tokenPath);
  //     fs.writeFileSync(tokenPath,)
  //   }
  // } catch (err) {
  //   console.log("文件操作错误", err);
  // }
  // path.resolve()当前项目所在目录对的绝对路径
  const parseData = await updataToken({ pdj: "pdj", id: "111", aa: "asdf" });
  res.send({ parseData });
  console.log("data", parseData);
}
);
module.exports = router;