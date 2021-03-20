require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session')
const bcrypt = require('bcrypt');
const passport = require('passport');
require('./passportConfig')(passport);
const User = require('./models/user.model');

const app = express();
const PORT = process.env.PORT || 5001;

const MongoUrl = process.env.MONGO_CONTAINER
mongoose.connect(MongoUrl, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true,
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PWD  
} );
const connection = mongoose.connection;

const MongoStore = require('connect-mongo')(session);

app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:3001'}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, X-PINGOTHER, Accept');
  next();
});

app.use(
  session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: connection, collection: 'sessions' }),
  cookie: {secure: false, httpOnly: true}
  })
)

app.use(passport.initialize());
app.use(passport.session());


// --------------------------------------------- Login Routes ----------------------------------------------

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

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) throw err;
    if (!user) res.json('email or password invalid');
    else {
      req.logIn(user, (err) => {
        res.json({
          "message": "success", 
          "id": user.id
        })
      });
    }
  })(req, res, next);
});

app.get('/requser', (req, res) => {
  console.log('req.user: ', req.user);
  res.send(req.user); 
});

const timesRouter = require('./routes/timeRoutes');
const usersRouter = require('./routes/userRoutes');
const workspacesRouter = require('./routes/workspaceRoutes');

app.use('/times', timesRouter);
app.use('/users', usersRouter);
app.use('/workspaces', workspacesRouter);

connection.once('open', () => {
  console.log('DB connection open');
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
