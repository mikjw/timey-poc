const MongooseWorkspace = require('../mongoModels/workspace.model');

class workspacesMongoDao{

  getAllWorkspaces = () => {
    return MongooseWorkspace.find()
    .then(result => { return result })
    .catch(err => { 
      console.log('dao error: ', err)
      throw err; 
    });
  }

  createWorkspace = (workspace) => {
    console.log('dao ws: ', workspace);
    const name = workspace.name;
    const newMongooseWorkspace = new MongooseWorkspace({ name });
    return newMongooseWorkspace.save()
    .then(result => { return result })
    .catch(err => { 
      console.log('dao error: ', err)
      throw err; 
    });
  }

  updateWorkspaceById = (id, name) => {
    return MongooseWorkspace.findById(id)
    .then(result => {
      result.name = name;
      return result.save()
      .then(result => { return result })
    })
    .catch(err => { 
      console.log('dao error: ', err)
      throw err; 
    });
  }

  deleteWorkspaceById = (id) => {
    return MongooseWorkspace.findByIdAndDelete(id)
    .then(result => { return result })
    .catch(err => { 
      console.log('dao error: ', err)
      throw err; 
    });
  }
}

module.exports = { workspacesMongoDao: workspacesMongoDao };
