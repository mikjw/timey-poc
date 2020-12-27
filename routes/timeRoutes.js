const router = require('express').Router();
const Time = require('../models/time.model')

router.route('/').get((req, res) => {
  Time.find()
  .then(times => {
    res.json(times);
  })
  .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
  console.log(req.body);
  const title = req.body.title;
  const seconds = Number(req.body.seconds);
  const newTime = new Time({
    title,
    seconds
  });

  newTime.save()
  .then(() => res.json('Time added succesfully'))
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

module.exports = router;