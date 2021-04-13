const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }, 
  workspace: {
    type: String
  }
});

const User = mongoose.model('Users', userSchema);

module.exports = User;