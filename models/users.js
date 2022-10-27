const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    unique: true,
    type: String
  },
  password: String,
  name: String,
  nickname: String,
});

module.exports = mongoose.model('UserList', userSchema);