
let MongoUrl
let MongoOptions

if (process.env.NODE_ENV === 'dev') {
  MongoUrl = process.env.MONGO_CONTAINER;
  MongoOptions = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PWD  
  }
} else if (process.env.NODE_ENV === 'staging') {
  MongoUrl = process.env.ATLAS_URI;
  MongoOptions = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true }
}

module.exports = {
  MongoUrl,
  MongoOptions
}