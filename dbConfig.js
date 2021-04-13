
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const PostgresStore = require('connect-pg-simple');
const timesMongoDao = require('./daos/timesMongo').timesMongoDao;

let MongoUrl, MongoOptions, connection, SessionStore, SessionStoreOptions, timeDao;


/**
 * DEV - use MongoDB running in local containter
 */

if (process.env.NODE_ENV === 'dev') {
  MongoUrl = process.env.MONGO_CONTAINER;
  MongoOptions = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PWD  
  }

  mongoose.connect(MongoUrl, MongoOptions);
  connection = mongoose.connection;

  connection.once('open', () => {
    console.log('NODE_ENV: ', process.env.NODE_ENV);
    console.log('DB connection open');
  })
  .catch(err => {
    console.log('error' + err);
  })

  SessionStore = MongoStore;
  SessionStoreOptions = { mongooseConnection: connection, collection: 'sessions' };
  timeDao = new timesMongoDao();



/**
 * STAGING - use MongoDB Atlas cloud storage
 */

} else if (process.env.NODE_ENV === 'staging') {
  MongoUrl = process.env.ATLAS_URI;
  MongoOptions = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true 
  }

  mongoose.connect(MongoUrl, MongoOptions);
  connection = mongoose.connection;

  connection.once('open', () => {
    console.log('NODE_ENV: ', process.env.NODE_ENV);
    console.log('DB connection open');
  })
  .catch(err => {
    console.log('error' + err);
  })

  SessionStore = MongoStore;
  SessionStoreOptions = { mongooseConnection: connection, collection: 'sessions' };
  timeDao = new timesMongoDao();



/**
 * POSTGRES testing - use pg-express
 */

} else if (process.env.NODE_ENV === 'pg') {
  SessionStore = PostgresStore;
}

module.exports = {
  SessionStore,
  SessionStoreOptions, 
  connection,
  timeDao
}
