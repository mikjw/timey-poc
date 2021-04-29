const router = require('express').Router();
const Workspace = require('../mongoModels/workspace.model')
const { checkAuthentication } = require('../helpers/authHelper');

const dbConfig = require('../dbConfig');

const Service = require('../services/workspaceService').workspaceService;
const workspaceService = new Service(dbConfig.workspaceDao);


/**
 * Get all workspaces
 */

router.route('/all').get((req, res) => {
  workspaceService.getAllWorkspaces()
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => res.status(400).json('Error: ' + err));
});


/**
 * Save a new workspace record
 */

router.route('/add').post(checkAuthentication, (req, res) => {
  const name = req.body.name;
  workspaceService.createWorkspace(name)
  .then(result => res.status(200).json(result))
  .catch(err => res.status(400).json('Error: ' + err));
})


/**
 * Udpate a workspace
 */

router.route('/update/:id').post(checkAuthentication, (req, res) => {
  workspaceService.updateWorkspaceById(req.params.id, req.body.name)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => res.status(400).json('Error: ' + err));
});


/**
 * Delete a workspace
 */

router.route('/:id').delete(checkAuthentication, (req, res) => {
  workspaceService.deleteWorkspaceById(req.params.id)
  .then(() => res.status(200).json('Workspace deleted successfully'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; 
