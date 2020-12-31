const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

router.route('/').get((req, res) => {
  user = User.find()
  .then(users => {
    res.json(users);
  })
  .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post(async (req, res) => {
  const email = req.body.email;
  const password = await bcrypt.hash(req.body.password, 12);
  const newUser = new User({
    email,
    password
  })
  newUser.save()
  .then(() => {
    res.json('User added succesfully')
    console.log(newUser);
  })
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req, res) => {
  User.findOne({ email: req.body.email })
  .then(user => {
    if (!user) { 
      res.json('Email or password invalid');
    }
    else {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) console.log('Error: ' + err);
        else if (result === true) {res.json('Success') }
        else { res.json('Email or password invalid') }
      })
    }
  })
  .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;