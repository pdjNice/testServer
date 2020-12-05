const { json } = require("body-parser");
const fs = require("fs");
const path = require("path");

const updataToken = function (option = {}) {
  return new Promise((resolve, reject) => {
    try {
      const tokenPath = path.join(path.resolve(), "token.json");
      if (fs.existsSync(tokenPath)) {
        console.log('该路径已存在');
        const data = fs.readFileSync(tokenPath).toString();
        const parseData = { ...JSON.parse(data), ...option };
        fs.unlinkSync(tokenPath);
        fs.writeFileSync(tokenPath, JSON.stringify(parseData));
        resolve(parseData);
      } else {
        console.log("文件不存在");
        const parseData = { ...option };
        fs.writeFile(`${path.resolve()}/token.json`, JSON.stringify(parseData), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(parseData);
          }
        });
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  }
  );
};
module.exports = {
  updataToken
};