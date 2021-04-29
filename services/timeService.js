class timeService {
  constructor(dao) {
    this.dao = dao;
  }

  getAllTimes = () => {
    return this.dao.getAllTimes()
    .then(timeArray => { return timeArray });
  }

  getTimeById = (id) => {
    return this.dao.getTimeById(id)
    .then(time => { return time });
  }

  getTimesByUserId = (userId) => {
    return this.dao.getTimesByUserId(userId)
    .then(timeArray => { return timeArray });
  }

  createTime = (title, seconds, workspace, user) => {
    return this.dao.createTime(title, seconds, workspace, user)
    .then(time => { return time });
  }

  updateTimeById = (id, title, seconds) => {
    return this.dao.updateTimeById(id, title, seconds)
    .then(time => { return time });
  }

  deleteTimeById = (id) => {
    return this.dao.deleteTimeById(id);
  }
}

module.exports = { timeService: timeService };
