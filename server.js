require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session')
const bcrypt = require('bcrypt');

const timesRouter = require('./routes/timeRoutes');
const usersRouter = require('./routes/userRoutes');

const User = require('./models/user.model');

const app = express();
const PORT = process.env.PORT || 5001;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true } );
const connection = mongoose.connection;

const MongoStore = require('connect-mongo')(session);

app.use(express.json());
app.use(cors());

app.use(
  session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: connection, collection: 'sessions' }),
  cookie: {secure: false, httpOnly: false}
  })
)

app.use( (req, res, next) => {
  console.log('id: ', req.session.id);
  console.log('cookie: ', req.session.cookie);
  return next();
});

app.post('/register', async (req, res) => {
  const email = req.body.email;
  const password = await bcrypt.hash(req.body.password, 12);
  const newUser = new User({
    email,
    password
  })
  newUser.save()
  .then(() => {
    res.json('User added succesfully')
    console.log('Added new user:\n' + newUser);
  })
  .catch(err => {
  console.error(err)
  res.status(400).json(err)
  })
  req.session.email = req.body.email;
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

connection.once('open', () => {
  console.log('Connected to Atlas');
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
