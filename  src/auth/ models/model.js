'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'ahmadkmal';
require('dotenv').config();
class Model {
  constructor(schema) {
    this.schema = schema;
  }
  async authenticate(user, pass) {
    let userInfo = this.schema.find(user);
    const valid = await bcrypt.compare(pass, userInfo.password);
    return valid ? userInfo : Promise.reject('wrong password');
  }
  async create(record) {
    /**
   * record
   * {username:"mahmoud",password:"1234"}
   */
    if (this.schema.find(record.username)) {
      record.password = await bcrypt.hash(record.password, 5);
      let newRecord = new this.schema(record);
      return newRecord;
    }
    return Promise.reject(); // ==>.catch
  }
  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, { new: true });
  }
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
  generateToken(user){
    const token = jwt.sign({ username: user.username }, SECRET);
    return token;
  }
  list(){
    return this.schema.find({});
  }
}

module.exports = Model;