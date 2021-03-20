const router = require('express').Router();
const Time = require('../models/time.model')
const { checkAuthentication } = require('../authHelper');

router.route('/:id').get(checkAuthentication, (req, res) => {
  Time.findById(req.params.id)
  .then(time => {
    res.json(time);
  })
})

router.route('/user/:user').get(checkAuthentication, (req, res) => {
  Time.find({ user: req.params.user })
  .then(times => {
    res.json(times);
  })
  .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/all').get(checkAuthentication, (req, res) => {
  Time.find()
  .then(times => {
    res.json(times);
  })
  .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const seconds = Number(req.body.seconds);
  const workspace = req.body.workspace;
  const user = req.body.user;
  const newTime = new Time({ title, seconds, workspace, user });

  newTime.save()
  .then(() => res.json(newTime._id))
  .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update/:id').post((req, res) => {
  Time.findById(req.params.id)
    .then(time => {
      time.title = req.body.title;
      time.seconds = req.body.seconds;
      time.save()
        .then(() => res.json(`${time.title} (ID ${req.params.id}) updated`))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').delete((req, res) => {
  Time.findByIdAndDelete(req.params.id)
    .then(() => res.json('Time deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;