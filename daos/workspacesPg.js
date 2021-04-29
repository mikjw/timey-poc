const Workspace = require('../models/workspace')

class workspacesPgDao {
  constructor(pool) {
    this.pool = pool;
  }

  getAllWorkspaces = () => {
    const queryString = 'SELECT * FROM workspaces ORDER BY id ASC';
    return this.pool.query(queryString)
    .then(result => { 
      const workspaceArray = result.rows.map(row => {
        return new Workspace(row.id, row.name);
      })
      return workspaceArray;
    })
    .catch(err => { 
      console.error('dao error: ', err)
      throw err; 
    });
  }

  createWorkspace = (name) => {
    const workspaceName = name;
    const queryString = 'INSERT INTO workspaces (name) VALUES ($1) RETURNING *';
    return this.pool.query(queryString, [workspaceName])
    .then(result => { 
      console.log('pgdao res.rows: ', result.rows);
      const data = result.rows[0];
      const workspace = new Workspace(data.id, data.name);
      return workspace;
    })
    .catch(err => { 
      console.error('dao error: ', err)
      throw err; 
    });
  }

  updateWorkspaceById = (id, name) => {
    const queryString = 'UPDATE workspaces set name = $1 WHERE id = $2 RETURNING *';
    return this.pool.query(queryString, [name, id])
    .then(result => { 
      console.log('pgdao res.rows: ', result.rows);
      const data = result.rows[0];
      const workspace = new Workspace(data.id, data.name);
      return workspace;
    })
    .catch(err => { 
      console.error('dao error: ', err)
      throw err; 
    });
  }

  deleteWorkspaceById = (id) => {
    const queryString = 'DELETE FROM workspaces WHERE id = $1';
    return this.pool.query(queryString, [id])
    .catch(err => { 
      console.error('dao error: ', err)
      throw err; 
    });
  }
}

module.exports = { workspacesPgDao: workspacesPgDao };
