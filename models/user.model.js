const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true
  }
});

const Time = mongoose.model('Users', userSchema);

module.exports = Time;