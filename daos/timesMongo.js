const MongooseTime = require('../mongoModels/time.model');

class timesMongoDao {

  getAllTimes = () => {
    return MongooseTime.find()
    .then(result => { return result })
    .catch(err => { 
      console.log('dao error: ', err)
      throw err; 
    });
  }

  getTimeById = (id) => {
    return MongooseTime.findById(id)
    .then(result => { return result })
    .catch(err => { 
      console.log('dao error: ', err)
      throw err; 
    });
  }

  getTimeByUserId = (userId) => {
    return MongooseTime.find({ user: userId })
    .then(result => { return result })
    .catch(err => { 
      console.log('dao error: ', err)
      throw err; 
    });
  }

  createTime = (time) => {
    const title = time.title;
    const seconds = time.seconds;
    const workspace = time.workspace;
    const user = time.user;
    const newMongooseTime = new MongooseTime({ title, seconds, workspace, user });
    return newMongooseTime.save()
    .then(result => { return result })
    .catch(err => { 
      console.log('dao error: ', err)
      throw err; 
    });
  }

  updateTimeById = (id, title, seconds) => {
    return MongooseTime.findById(id)
    .then(result => {
      result.title = title;
      result.seconds = seconds;
      return result.save()
      .then(result => { return result })
    })
    .catch(err => { 
      console.log('dao error: ', err)
      throw err; 
    });
  }

  deleteTimeById = (id) => {
    return MongooseTime.findByIdAndDelete(id)
    .then(result => { return result })
    .catch(err => { 
      console.log('dao error: ', err)
      throw err; 
    });
  }
}

module.exports = { timesMongoDao: timesMongoDao };
