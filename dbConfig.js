
const mongoose = require('mongoose');
const Pool = require('pg').Pool
const MongoStore = require('connect-mongo');
const PostgresStore = require('connect-pg-simple');
const timesMongoDao = require('./daos/timesMongo').timesMongoDao;
const workspacesMongoDao = require('./daos/workspacesMongo').workspacesMongoDao;
const timesPgDao = require('./daos/timesPg').timesPgDao;

let MongoUrl, MongoOptions, connection, SessionStore, SessionStoreOptions, timeDao, workspaceDao, pool;


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
  });

  SessionStore = MongoStore;
  SessionStoreOptions = { mongooseConnection: connection, collection: 'sessions' };
  timeDao = new timesMongoDao();
  workspaceDao = new workspacesMongoDao();



/**
 * POSTGRES - use pg-express
 */

} else if (process.env.NODE_ENV === 'pg') {
  pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: 5432
  });

  SessionStore = PostgresStore;
  SessionStoreOptions = {pool: pool}

  timeDao = new timesPgDao(pool);
}

module.exports = {
  SessionStore,
  SessionStoreOptions, 
  connection,
  timeDao,
  workspaceDao, 
  pool
}
