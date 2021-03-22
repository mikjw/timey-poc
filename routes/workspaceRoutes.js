const router = require('express').Router();
const Workspace = require('../models/workspace.model')
const { checkAuthentication } = require('../helpers/authHelper');

router.route('/').get((req, res) => {
  Workspace.find()
  .then(workspaces => {
    res.json(workspaces);
  })
  .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post(checkAuthentication, (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const newWorkspace = new Workspace({ name });

  newWorkspace.save()
  .then(() => res.json('Workspace added succesfully'))
  .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update/:id').post(checkAuthentication, (req, res) => {
  Workspace.findById(req.params.id)
    .then(workspace => {
      workspace.name = req.body.name;

      workspace.save()
        .then(() => res.json('Workspace updated successfully'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete(checkAuthentication, (req, res) => {
  Workspace.findByIdAndDelete(req.params.id)
    .then(() => res.json('Workspace deleted successfully'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; 
