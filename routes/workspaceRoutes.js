const router = require('express').Router();
const Workspace = require('../models/workspace.model')

router.route('/').get((req, res) => {
  Workspace.find()
  .then(workspaces => {
    res.json(workspaces);
  })
  .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const newWorkspace = new Workspace({ name });

  newWorkspace.save()
  .then(() => res.json('Workspace added succesfully'))
  .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
