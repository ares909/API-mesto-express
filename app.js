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

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`App listening port ${PORT}`);
});
