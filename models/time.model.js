const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  seconds: {
    type: number,
    required: true
  }
})

const Time = mongoose.model('Time', timeSchema);

module.exports = Time;