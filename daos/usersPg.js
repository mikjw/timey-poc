const User = require('../models/user')

class usersPgDao {
  constructor(pool) {
    this.pool = pool;
  }

  getAllUsers = () => {
    const queryString = 'SELECT * FROM users ORDER BY id ASC';
    return this.pool.query(queryString)
    .then(result => { 
      const userArray = result.rows.map(row => {
        return new User(row.id, row.email, row.password);
      })
      return userArray;
    })
    .catch(err => { 
      console.error('dao error: ', err)
      throw err; 
    });
  }

  getUserById = (id) => {
    const queryString = 'SELECT * FROM users WHERE id = $1';
    return this.pool.query(queryString, [id])
    .then(result => {
      const data = result.rows[0];
      const user = new User(data.id, data.email, data.password);
      return user 
    })
    .catch(err => {
      console.error('dao error: ', err)
      throw err; 
    });
  }
  
  getUserByEmail = (email) => {
    const queryString = 'SELECT * FROM users WHERE email = $1';
    return this.pool.query(queryString, [email])
    .then(result => {
      const data = result.rows[0];
      const user = new User(data.id, data.email, data.password);
      return user 
    })
    .catch(err => {
      console.error('dao error: ', err)
      throw err; 
    });
  }

  createUser = (email, password) => {
    const queryString = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';
    return this.pool.query(queryString, [email, password])
    .then(result => {
      const data = result.rows[0];
      const user = new User(data.id, data.email, data.password);
      return user;
    })
    .catch(err => {
      console.error('dao error: ', err)
      throw err; 
    });
  }
}

module.exports = { usersPgDao: usersPgDao };
