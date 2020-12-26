const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Time = require('./models/time.model')

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(cors());

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

app.get('/times', (req, res) => {
  Time.find()
  .then(times => {
    console.log(times);
    res.json(times);
  })
  .catch(err => res.status(400).json('Error: ' + err));
})

app.post('/times/add/', (req, res) => {
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

app.post('/times/update/:id', (req, res) => {
  Time.findById(req.params.id)
    .then(time => {
      time.title = req.body.title;
      time.seconds = req.body.seconds;
      time.save()
        .then(() => res.json(`Time ${req.params.id} updated`))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
  })

app.listen(PORT, () => {
  console.log(`Listenining on ${PORT}`);
})
