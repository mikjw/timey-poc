module.exports = {
  checkAuthentication: function (req, res, next) {
    if (req.isAuthenticated()) { 
      console.log('AUTH YES')
      return next() 
    } 
    console.log('AUTH YES')
    res.sendStatus(403);
    }
  }
