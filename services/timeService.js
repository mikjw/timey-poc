const Time = require("../models/time");

class timeService {
  constructor(dao) {
    this.dao = dao;
  }

  getAllTimes = () => {
    return this.dao.getAllTimes()
    .then(result => { return result })
    .catch(err => { throw err })
  }

  getTimeById = (id) => {
    return this.dao.getTimeById(id)
    .then(result => { return result })
    .catch(err => { throw err })
  }

  getTimeByUserId = (userId) => {
    return this.dao.getTimeByUserId(userId)
    .then(result => { return result })
    .catch(err => { throw err })
  }

  createTime = (title, seconds, workspace, user) => {
    const timeTitle = title;
    const timeSeconds = Number(seconds);
    const timeWorkspace = workspace;
    const timeUser = user;
    const newTime = new Time(null, timeTitle, timeSeconds, timeWorkspace, timeUser)
    return this.dao.createTime(newTime)
    .then(result => { return result })
    .catch(err => { throw err });
  }

  updateTimeById = (id, title, seconds) => {
    return this.dao.updateTimeById(id, title, seconds)
    .then(result => { return result })
    .catch(err => { throw err })
  }

  deleteTimeById = (id) => {
    return this.dao.deleteTimeById(id)
    .then(result => { return result })
    .catch(err => { throw err })
  }
}

module.exports = { timeService: timeService }
