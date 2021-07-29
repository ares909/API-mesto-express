const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();

const router = require('./routes');

mongoose.connect('mongodb://localhost:27017/mesto-app-db', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`App listening port ${PORT}`);
});
