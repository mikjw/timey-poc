const router = require('express').Router();
const Time = require('../mongoModels/time.model')
const analyticsService = require('../services/analytics.service');
const { checkAuthentication } = require('../helpers/authHelper');


/**
 * Get analytics for passed-in user
 */

router.route('/:user').get(checkAuthentication, (req, res) => {
  Time.find({ user: req.params.user }).lean()
  .then(times => {
    res.json(analyticsService.getAnalytics(times));
  })
})

module.exports = router; 
