const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const Service = require('./services/userService').userService;
const dbConfig = require('./dbConfig');
const userService = new Service(dbConfig.userDao);

module.exports = function (passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    userService.getUserByEmail(email)
    .then((user) => {
      console.log('passport user:', user);
      if (!user) {
        return done(null, false) 
      } 
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) { 
          throw err; 
        }
        if (result) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
    });
  }));

  passport.serializeUser(function(user, done) { 
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    userService.getUserById(id)
    .then(user => {
      return done(null, user)
    })
    .catch(err => {
      return done(err);
    })
  });
}