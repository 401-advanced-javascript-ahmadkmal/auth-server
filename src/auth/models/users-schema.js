'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const users = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String },
  fullname: { type: String },
  role: { type: String, enum: ['admin', 'editor', 'writer', 'user'] },
});
users.pre('save', async function () {
  
  this.password = await bcrypt.hash(this.password, 5);
});

module.exports = mongoose.model('auth', users);