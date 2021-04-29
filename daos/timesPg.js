const Time = require('../models/time')

class timesPgDao {
  constructor(pool) {
    this.pool = pool;
  }


  // Returns array of Times

  getAllTimes = () => {
    const queryString = 'SELECT * FROM times ORDER BY id ASC';
    return this.pool.query(queryString)
    .then(result => { 
      const timeArray = result.rows.map(row => {
        return new Time(row.id, row.title, Number(row.seconds), row.workspace, row.userid);
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
    const queryString = 'SELECT * FROM times WHERE id = $1';
    return this.pool.query(queryString, [id])
    .then(result => {
      const data = result.rows[0];
      const time = new Time(data.id, data.title, Number(data.seconds), data.workspace, data.userid);
      return time;
    })
    .catch(err => { 
      console.error('dao error: ', err)
      throw err; 
    });
  }


  // Returns array of Times

  getTimesByUserId = (userId) => {
    const queryString = 'SELECT * FROM times WHERE userid = $1 ORDER BY id ASC';
    return this.pool.query(queryString, [userId])
    .then(result => { 
      const timeArray = result.rows.map(row => {
        return new Time(row.id, row.title, Number(row.seconds), row.workspace, row.userid);
      })
      return timeArray;
    })
    .catch(err => { 
      console.error('dao error: ', err)
      throw err; 
    });
  }


  // Returns array of Times

  createTime = (title, seconds, workspace, userId) => {
    const queryString = 'INSERT INTO times (title, seconds, workspace, userid) VALUES ($1, $2, $3, $4) RETURNING *';
    return this.pool.query(queryString, [title, seconds, workspace, userId])
    .then(result => { 
      const data = result.rows[0];
      const time = new Time(data.id, data.title, data.seconds, data.workspace, data.userid);
      console.log('pg dao time: ', time);
      return time;
    })
    .catch(err => { 
      console.error('dao error: ', err)
      throw err; 
    });
  }


  // Returns Time 

  updateTimeById = (id, title, seconds) => {
    const queryString = 'UPDATE times set seconds = $1, title = $2 WHERE id = $3 RETURNING *';
    return this.pool.query(queryString, [seconds, title, id])
    .then(result => { 
      const data = result.rows[0];
      const time = new Time(data.id, data.title, data.seconds, data.workspace, data.userid);
      return time;
    })
    .catch(err => { 
      console.error('dao error: ', err)
      throw err; 
    });
  }


  // Returns void

  deleteTimeById = (id) => {
    const queryString = 'DELETE FROM times WHERE id = $1';
    return this.pool.query(queryString, [id])
    .catch(err => { 
      console.error('dao error: ', err)
      throw err; 
    });
  }
}

module.exports = { timesPgDao: timesPgDao };
