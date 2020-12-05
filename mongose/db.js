const mongoose = require('mongoose');

class Db {
  constructor(dbname) {
    this.dburl = `mongodb://127.0.0.1:27017/${dbname}`;
  }
  connect() {
    return new Promise((resolve, reject) => {
      mongoose.connect(this.dburl, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  // 查找模型
  fmodel(modelname) {
    let schema_path = path.join(__dirname, 'schema', modelname);
    let model = mongoose.model(modelname, require(schema_path));
    return model;
  }
  // 负责连接和初始化model
  async common(modelname) {
    await this.connect();
    return this.fmodel(modelname);
  }
  async find(modelname, query = {}, callback) {
    let model = await this.common(modelname);
    model.find(query, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(result);
      }
    })
  }
  //增加
  async insert(modelname, data, callback) {
    let model = await this.common(modelname);
    model.insertMany(data, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(result);
      }
    });
  }
}
module.exports = Db;