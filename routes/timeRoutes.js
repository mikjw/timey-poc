const router = require('express').Router();
const Time = require('../models/time.model')
const { checkAuthentication } = require('../helpers/authHelper');
const mongo = require('../daos/times-mongo');
let db = '';

if (process.env.NODE_ENV !== 'test') { 
  db = mongo 
}


/**
 * get all times
 */

router.route('/all').get((req, res) => {
  db.getAllTimes(req, res)
  .then(times => {
    res.status(200).json(times);
  })
  .catch(err => res.status(400).json('Error: ' + err));
})


/**
 * find a time by ID
 */

router.route('/:id').get(checkAuthentication, (req, res) => {
  Time.findById(req.params.id)
  .then(time => {
    res.status(200).json(time);
  })
})


/**
 * find a time by user
 */

router.route('/user/:user').get(checkAuthentication, (req, res) => {
  Time.find({ user: req.params.user })
  .then(times => {
    res.status(200).json(times);
  })
  .catch(err => res.status(400).json('Error: ' + err));
})


/**
 * save a new time record
 */

router.route('/add').post(checkAuthentication, (req, res) => {
  const title = req.body.title;
  const seconds = Number(req.body.seconds);
  const workspace = req.body.workspace;
  const user = req.body.user;
  const newTime = new Time({ title, seconds, workspace, user });

  newTime.save()
  .then(() => res.status(200).json(newTime._id))
  .catch(err => res.status(400).json('Error: ' + err));
})


/**
 * update a time record
 */

router.route('/update/:id').post(checkAuthentication, (req, res) => {
  Time.findById(req.params.id)
    .then(time => {
      time.title = req.body.title;
      time.seconds = req.body.seconds;
      time.save()
        .then(() => res.status(200).json(`${time.title} (ID ${req.params.id}) updated`))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})


/**
 * update a time record
 */

router.route('/:id').delete(checkAuthentication, (req, res) => {
  Time.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json('Time deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;