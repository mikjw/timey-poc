const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  seconds: {
    type: Number,
    required: true
  }
});

const Time = mongoose.model('Times', timeSchema);

module.exports = Time;