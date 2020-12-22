const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Connected to Atlas");
})

app.get('/', (req, res) => {
  res.send('home');
})

app.listen(PORT, () => {
  console.log(`Listenining on ${PORT}`);
})




