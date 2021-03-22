const router = require('express').Router();
const Time = require('../models/time.model')
const analyticsService = require('../services/analytics.service');
const { checkAuthentication } = require('../helpers/authHelper');

router.route('/:user').get(checkAuthentication, (req, res) => {
  Time.find({ user: req.params.user }).lean()
  .then(time => {
    res.json(analyticsService.getAnalytics(time));
  })
})

module.exports = router; 
