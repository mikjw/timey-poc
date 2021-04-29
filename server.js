require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./routes/authRoutes').passport;
require('./passportConfig')(passport);
const User = require('./mongoModels/user.model');
const dbConfig = require('./dbConfig');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:3001'}));


// Set CORS headers 
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, X-PINGOTHER, Accept');
  next();
});


// Pass session instance to session store from config
const SessionStore = dbConfig.SessionStore(session);

app.use(
  session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new SessionStore(dbConfig.SessionStoreOptions),
  cookie: {secure: false, httpOnly: true}
  })
)


app.use(passport.initialize());
app.use(passport.session());


// import routes and set as middleware
const authRouter = require('./routes/authRoutes').router;
const usersRouter = require('./routes/userRoutes');
const timesRouter = require('./routes/timeRoutes');
const workspacesRouter = require('./routes/workspaceRoutes');
const analyticsRouter = require('./routes/analyticsRoutes');

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/times', timesRouter);
app.use('/workspaces', workspacesRouter);
app.use('/analytics', analyticsRouter);

app.get('/', (req, res) => {s
  res.json('home');
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.info(`Listenining on ${PORT}`);
  })
}

module.exports = app;
