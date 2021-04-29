const router = require('express').Router();
const passport = require('passport');
const User = require('../mongoModels/user.model');

const dbConfig = require('../dbConfig');

const Service = require('../services/userService').userService;
const userService = new Service(dbConfig.userDao);



/**
 * Register a new user 
 */

router.route('/register').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  userService.createUser(email, password)
  .then((user) => {
    res.status(200).json({'message': 'success'})
  })
  .catch(err => {
    console.error(err)
    res.status(400).json({'message': 'error'})
  })
});


/**
 * Log in with user details 
 */

router.route('/login').post((req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
     console.error(err);
     res.status(403).json({'message': 'email or password invalid'});
    }
    if (!user) res.status(403).json({'message': 'email or password invalid'});
    else {
      req.logIn(user, (err) => {
        res.status(200).json({
          'message': 'success', 
          'id': user.id
        })
      });
    }
  })(req, res, next);
});

module.exports = { 
  router: router, 
  passport: passport
}
