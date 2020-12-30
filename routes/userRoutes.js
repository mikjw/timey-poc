const router = require('express').Router();
const User = require('../models/user.model')

router.route('/').get((req, res) => {
  User.find()
  .then(users => {
    res.json(users);
  })
  .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const newUser = new User({
    email,
    password
  });

  newUser.save()
  .then(() => res.json('User added succesfully'))
  .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/login').post((req, res) => {
  User.find({ email: req.body.email })
    .then(user => {
      if (user[0].password === req.body.password) {
        res.json('Sucess')
      } else {
        res.json('Wrong user-password combination')
      }
    })
    .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;