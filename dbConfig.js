
const mongoose = require('mongoose');
const Pool = require('pg').Pool
const MongoStore = require('connect-mongo');
const postgresStore = require('connect-pg-simple');
const timesMongoDao = require('./daos/timesMongo').timesMongoDao;
const workspacesMongoDao = require('./daos/workspacesMongo').workspacesMongoDao;
const workspacesPgDao = require('./daos/workspacesPg').workspacesPgDao;
const timesPgDao = require('./daos/timesPg').timesPgDao;
const usersMongoDao = require('./daos/usersMongo').usersMongoDao;
const usersPgDao = require('./daos/usersPg').usersPgDao;

let MongoUrl, MongoOptions, connection, SessionStore, SessionStoreOptions, timeDao, workspaceDao, userDao, pool;



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
  };

  mongoose.connect(MongoUrl, MongoOptions);
  connection = mongoose.connection;

  connection.once('open', () => {
    console.log('NODE_ENV: ', process.env.NODE_ENV);
    console.log('DB connection open');
  })
  .catch(err => {
    console.log('error' + err);
  });

  SessionStore = MongoStore;
  SessionStoreOptions = { mongooseConnection: connection, collection: 'sessions' };
  timeDao = new timesMongoDao();
  workspaceDao = new workspacesMongoDao();
  userDao = new usersMongoDao();
}



/**
 * STAGING - use MongoDB Atlas cloud storage
 */

else if (process.env.NODE_ENV === 'staging') {
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
  });

  SessionStore = MongoStore;
  SessionStoreOptions = { mongooseConnection: connection, collection: 'sessions' };
  timeDao = new timesMongoDao();
  workspaceDao = new workspacesMongoDao();
  userDao = new usersMongoDao();
}



/**
 * PG - use postgres db running in local container
 */

else if (process.env.NODE_ENV === 'pg') {
  pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
  });

  SessionStore = postgresStore;
  SessionStoreOptions = {pool: pool}

  timeDao = new timesPgDao(pool);
  userDao = new usersPgDao(pool);
  workspaceDao = new workspacesPgDao(pool);
}



/**
 * TEST - use postgres test db running in local container
 */

else if (process.env.NODE_ENV === 'test') {
  pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_TEST_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
  });

  SessionStore = postgresStore;
  SessionStoreOptions = {pool: pool}

  timeDao = new timesPgDao(pool);
  userDao = new usersPgDao(pool);
  workspaceDao = new workspacesPgDao(pool);
}

module.exports = {
  SessionStore,
  SessionStoreOptions, 
  connection,
  timeDao,
  workspaceDao, 
  userDao
}
