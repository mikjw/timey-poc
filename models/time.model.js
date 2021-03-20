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
  }, 
  workspace: {
    type: String
  },
  user: {
    type: String,
    required: true,
    immutable: true
  }
});

const Time = mongoose.model('Times', timeSchema);

module.exports = Time;