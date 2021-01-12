const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const timesRouter = require('./routes/timeRoutes');
const usersRouter = require('./routes/userRoutes');

const User = require('./models/user.model');

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
  console.log(req);
  const email = req.body.email;
  const password = await bcrypt.hash(req.body.password, 12);
  const newUser = new User({
    email,
    password
  })
  newUser.save()
  .then(() => {
    res.json('User added succesfully'),
    console.log(newUser);
  })
  .catch(err => {
  console.error(err)
  res.status(400).json(err)
  })
});

app.post('/login', (req, res) => {
  User.findOne({ email: req.body.email })
  .then(user => {
    if (!user) { 
      res.json('Email or password invalid');
    }
    else {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) console.log('Error: ' + err);
        else if (result === true) {res.json('Success') }
        else { res.json('Email or password invalid') }
      })
    }
  })
  .catch(err => res.status(400).json('Error: ' + err))
});

app.use('/times', timesRouter);
app.use('/users', usersRouter);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true } );
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Connected to Atlas");
})
.catch(err => {
  console.log('error' + err);
})

app.get('/', (req, res) => {
  res.json('home');
})

app.listen(PORT, () => {
  console.log(`Listenining on ${PORT}`);
})
