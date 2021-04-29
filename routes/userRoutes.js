const router = require('express').Router();

const dbConfig = require('../dbConfig');

const Service = require('../services/userService').userService;
const userService = new Service(dbConfig.userDao);

router.route('/all').get((req, res) => {
  userService.getAllUsers()
  .then(result => {
    res.status(200).json(result);
  })
.catch(err => res.status(400).json('Error: ' + err));
})

router.route('/email').get((req, res) => {
  userService.getUserByEmail(req.body.email)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
