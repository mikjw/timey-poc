const User = require('./models/user.model');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email })
      .then((user) => {
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
    User.findById(id, function (err, user) {
        if (err) { 
          return done(err); 
        } else {
          return done(null, user);
        }
    });
  });
}