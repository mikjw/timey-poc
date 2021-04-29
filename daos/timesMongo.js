const Time = require('../models/time')
const MongooseTime = require('../mongoModels/time.model');

class timesMongoDao {


  // Returns array of Times

  getAllTimes = () => {
    return MongooseTime.find()
    .then(results => { 
      const timeArray = results.map(result => {
        return new Time(result.id, result.title, result.seconds, result.workspace, result.user);
      })
      return timeArray;
    })
    .catch(err => { 
      console.error('dao error: ', err)
      throw err; 
    });
  }


  // Returns Time

  getTimeById = (id) => {
    return MongooseTime.findById(id)
    .then(result => { 
      const time = new Time(result.id, result.title, result.seconds, result.workspace, result.user);
      return time 
    })
    .catch(err => { 
      console.error('dao error: ', err)
      throw err; 
    });
  }

  
  // Returns array of Times

  getTimesByUserId = (userId) => {
    return MongooseTime.find({ user: userId })
    .then(results => { 
      const timeArray = results.map(result => {
        return new Time(result.id, result.title, result.seconds, result.workspace, result.user);
      })
      return timeArray;
    })
    .catch(err => { 
      console.error('dao error: ', err)
      throw err; 
    });
  }


  // Returns array of Times

  createTime = (title, seconds, workspace, user) => {
    const newMongooseTime = new MongooseTime({ title, seconds, workspace, user });
    return newMongooseTime.save()
    .then(result => { 
      const time = new Time(result.id, result.title, result.seconds, result.workspace, result.user);
      return time 
    })
    .catch(err => { 
      console.error('dao error: ', err)
      throw err; 
    });
  }


  // Returns Time 

  updateTimeById = (id, title, seconds) => {
    return MongooseTime.findById(id)
    .then(result => {
      result.title = title;
      result.seconds = seconds;
      return result.save()
      .then(result => { 
      const time = new Time(result.id, result.title, result.seconds, result.workspace, result.user);
      return time 
      })
    })
    .catch(err => { 
      console.error('dao error: ', err)
      throw err; 
    });
  }


  // Returns void

  deleteTimeById = (id) => {
    return MongooseTime.findByIdAndDelete(id)
    .catch(err => { 
      console.error('dao error: ', err)
      throw err; 
    });
  }
}

module.exports = { timesMongoDao: timesMongoDao };
