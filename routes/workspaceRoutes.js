const router = require('express').Router();
const Workspace = require('../mongoModels/workspace.model')
const { checkAuthentication } = require('../helpers/authHelper');


/**
 * Get all workspaces
 */

router.route('/').get((req, res) => {
  Workspace.find()
  .then(workspaces => {
    res.status(200).json(workspaces);
  })
  .catch(err => res.status(400).json('Error: ' + err));
})


/**
 * Create a new workspace
 */

router.route('/add').post(checkAuthentication, (req, res) => {
  const name = req.body.name;
  const newWorkspace = new Workspace({ name });

  newWorkspace.save()
  .then(() => res.status(200).json('Workspace added succesfully'))
  .catch(err => res.status(400).json('Error: ' + err));
})


/**
 * Udpate a workspace
 */

router.route('/update/:id').post(checkAuthentication, (req, res) => {
  Workspace.findById(req.params.id)
    .then(workspace => {
      workspace.name = req.body.name;

      workspace.save()
        .then(() => res.status(200).json('Workspace updated successfully'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


/**
 * Delete a workspace
 */

router.route('/:id').delete(checkAuthentication, (req, res) => {
  Workspace.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json('Workspace deleted successfully'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; 
