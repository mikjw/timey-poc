const Time = require('../models/time')

class timesPgDao {
  constructor(pool) {
    this.pool = pool;
  }

  getAllTimes = () => {
    return this.pool.query('SELECT * FROM times')
    .then(res => { 
      let arr = [];
      res.rows.forEach(row => {
        const time = new Time(row.id, row.title, row.seconds, null, null)
        arr.push(time);
      })
      return arr;
    })
  }
}

module.exports = { timesPgDao: timesPgDao }
