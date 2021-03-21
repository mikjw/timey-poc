const router = require('express').Router();
const Time = require('../models/time.model')
const mongoose = require('mongoose');

const getAllTimes = (req, res) => {
  return Time.find()
}

module.exports = {
  getAllTimes
}