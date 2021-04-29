const MongooseWorkspace = require('../mongoModels/workspace.model');

class workspacesMongoDao{

  getAllWorkspaces = () => {
    return MongooseWorkspace.find()
    .then(results => { 
      const workspaceArray = results.map(result => {
        return new Time(result.id, result.name);
      })
      return workspaceArray;
    })
    .catch(err => { 
      console.error('dao error: ', err)
      throw err; 
    });
  }

  createWorkspace = (name) => {
    const newMongooseWorkspace = new MongooseWorkspace({ name });
    return newMongooseWorkspace.save()
    .then(result => { 
      const workspace = new Workspace(result._id, result.name);
      return workspace;
    })
    .catch(err => { 
      console.error('dao error: ', err)
      throw err; 
    });
  }

  updateWorkspaceById = (id, name) => {
    return MongooseWorkspace.findById(id)
    .then(result => {
      result.name = name;
      return result.save()
      .then(result => { 
        const workspace = new Workspace(result._id, result.name);
        return workspace;
      })
    })
    .catch(err => { 
      console.error('dao error: ', err)
      throw err; 
    });
  }

  deleteWorkspaceById = (id) => {
    return MongooseWorkspace.findByIdAndDelete(id)
    .catch(err => {
      console.error('dao error: ', err)
      throw err;
    });
  }
}

module.exports = { workspacesMongoDao: workspacesMongoDao };
