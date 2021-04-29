const User = require('../models/user');
const MongooseUser = require('../mongoModels/user.model');

class usersMongoDao {

  getAllUsers = () => {
    return MongooseUser.find()
    .then(results => { 
      const userArray = results.map(result => {
        return new User(result._id, result.email, result.password);
      })
      return userArray;
    })
    .catch(err => { 
      console.error('dao error: ', err)
      throw err; 
    });
  }

  getUserById = (id) => {
    return MongooseUser.findById(id)
    .then(result => { 
      const user = new User(result._id, result.email, result.password);
      return user;
    })
    .catch(err => { 
      console.error('dao error: ', err)
      throw err;
    });
  }
  
  getUserByEmail = (email) => {
    return MongooseUser.findOne({ email: email })
    .then(result => {
      if (result !== null) {
        const user = new User(result._id, result.email, result.password);
        return user;
      }
    })
    .catch(err => { 
      console.error('dao error: ', err)
      throw err; 
    });
  }

  createUser = (user) => {
    const email = user.email;
    const password = user.password;
    const newMongooseTime = new MongooseUser({ email, password });
    return newMongooseTime.save()
    .then(result => { 
      const user = new User(result._id, result.email, result.password);
      return user;
    })
    .catch(err => { 
      console.error('dao error: ', err)
      throw err; 
    });
  }
}

module.exports = { usersMongoDao: usersMongoDao };
