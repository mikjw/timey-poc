class workspaceService {
  constructor(dao) {
    this.dao = dao;
  }

  getAllWorkspaces = () => {
    return this.dao.getAllWorkspaces()
    .then(result => { return result });
  }

  createWorkspace = (name) => {
    return this.dao.createWorkspace(name)
    .then(result => { return result });
  }

  updateWorkspaceById = (id, name) => {
    return this.dao.updateWorkspaceById(id, name)
    .then(result => { return result });
  }

  deleteWorkspaceById = (id) => {
    return this.dao.deleteWorkspaceById(id)
    .then(result => { return result });
  }
}

module.exports = { workspaceService: workspaceService };
