const router = require('express').Router();
const { checkAuthentication } = require('../helpers/authHelper');

const dbConfig = require('../dbConfig');

const Service = require('../services/timeService').timeService;
const timeService = new Service(dbConfig.timeDao);


/**
 * Get all times
 */

router.route('/all').get((req, res) => {
  timeService.getAllTimes()
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => res.status(400).json('Error: ' + err));
});


/**
 * Get a time by ID
 */

router.route('/:id').get(checkAuthentication, (req, res) => {
  timeService.getTimeById(req.params.id)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => res.status(400).json('Error: ' + err));
})


/**
 * Get all times for a user
 */

router.route('/user/:user').get(checkAuthentication, (req, res) => {
  timeService.getTimesByUserId(req.params.user)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => res.status(400).json('Error: ' + err));
})


/**
 * Save a new time record
 */

router.route('/add').post( (req, res) => {
  const title = req.body.title;
  const seconds = req.body.seconds;
  const workspace = req.body.workspace;
  const user = req.body.user;
  timeService.createTime(title, seconds, workspace, user)
  .then((result) => res.status(200).json(result.id))
  .catch(err => res.status(400).json(err));
})


/**
 * Update a time record
 */

router.route('/update/:id').post(checkAuthentication, (req, res) => {
  timeService.updateTimeById(req.params.id, req.body.title, req.body.seconds)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => res.status(400).json('Error: ' + err));
})


/**
 * Delete a time record
 */

router.route('/:id').delete(checkAuthentication, (req, res) => {
  timeService.deleteTimeById(req.params.id)
    .then(() => res.status(200).json('Time deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
