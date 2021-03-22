const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

router.route('/').get((req, res) => {
  user = User.find()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;