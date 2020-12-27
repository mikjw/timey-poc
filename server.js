const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const timesRouter = require('./routes/timeRoutes');
const usersRouter = require('./routes/userRoutes');

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(cors());

app.use('/times', timesRouter);
app.use('/users', usersRouter);

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

app.listen(PORT, () => {
  console.log(`Listenining on ${PORT}`);
})
