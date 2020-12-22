const express = require('express');
const app = express();

const PORT = 5000;

app.get('/', (req, res) => {
  res.send('home');
})

app.listen(PORT, () => {
  console.log(`Listenining on ${PORT}`);
})




