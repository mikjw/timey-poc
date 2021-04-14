const Workspace = require("../models/workspace");

class workspaceService {
  constructor(dao) {
    this.dao = dao;
  }

  getAllWorkspaces = () => {
    console.log('dao: ', this.dao);
    return this.dao.getAllWorkspaces()
    .then(result => { return result })
  }

  createWorkspace = (name) => {
    const workspaceName = name;
    const newWorkspace = new Workspace(null, workspaceName);
    return this.dao.createWorkspace(newWorkspace)
    .then(result => { return result })
  }

  updateWorkspaceById = (id, name) => {
    return this.dao.updateWorkspaceById(id, name)
    .then(result => { return result })
  }

  deleteWorkspaceById = (id) => {
    return this.dao.deleteWorkspaceById(id)
    .then(result => { return result })
  }
}

module.exports = { workspaceService: workspaceService }
