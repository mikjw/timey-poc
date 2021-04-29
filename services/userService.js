const bcrypt = require('bcrypt');

class userService {
  constructor(dao) {
    this.dao = dao;
  }

  getAllUsers = () => {
    return this.dao.getAllUsers()
    .then(userArray => { return userArray });
  }
  
  getUserById = (id) => {
    return this.dao.getUserById(id)
    .then(user => { return user });
  }

  getUserByEmail = (email) => {
    return this.dao.getUserByEmail(email)
    .then(user => { return user });
  }

  createUser = async (email, password) => {
    const hashedPassword = await bcrypt.hash(password, 12);
    return this.dao.createUser(email, hashedPassword)
    .then(user => { return user });
  }
}

module.exports = { userService: userService };
