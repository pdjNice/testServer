const expres = require("express");
const bodyParser = require('body-parser');
const sha1 = require("sha1");
const cors = require('cors');

//路由
const login = require("./router/login");
const backControl = require("./router/backmanage");
const test = require('./router/test');
const { token } = require("./config");

const app = new expres();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expres.static('views'))
app.use("/login", login);
app.use("/backControl", backControl);
app.use("/test", test);


app.set('views', __dirname);
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

app.get("/", (req, res, next) => {
  //不带参数的请求返回首页
  if (Object.keys(req.query).length === 0) {
    res.render("./views/build/index.html");
  }
  //微信开发者接入
  // 1）将token、timestamp、nonce三个参数进行字典序排序
  // token=pdjnice666
  // 2）将三个参数字符串拼接成一个字符串进行sha1加密
  // 3）开发者获得加密后的字符串可与signature对比，相同则标识该请求来源于微信
  // {
  //   signature: 'b9524eb76bba5903b088da799805425acbb9de65',
  //     echostr: '2678480051369540527',
  //       timestamp: '1607072678',
  //         nonce: '187324357'
  // }
  const { signature, echostr, timestamp, nonce } = req.query;
  const arr = [timestamp, nonce, token];
  const arrSortString = arr.sort().join("");
  const sh1Str = sha1(arrSortString);
  if (sh1Str === signature) {
    res.send(echostr);
  }
});

module.exports = app;

