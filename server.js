const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = 5000;

app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true } );

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Connected to Atlas");
})
.catch(err => {
  console.log('error' + err);
})

app.get('/', (req, res) => {
  res.send('home');
})

// app.get('/times', (req, res) => {
//   Time.find()
//   .then(times => res.json(times))
//   .catch(err => res.status(400).json('Error: ' + err));
// })

app.post('/times/add/', (req, res) => {
  //console.log(req);
  console.log(req.body);
  const title = req.body.title;
  const seconds = Number(req.body.seconds);
  const newTime = new Time({
    title,
    seconds
  });

  newTime.save()
  .then(() => res.json('Time added succesfully'))
  .catch(err => res.status(400).json('Error: ' + err));
})

app.listen(PORT, () => {
  console.log(`Listenining on ${PORT}`);
})




