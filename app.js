const express = require('express');
const mongoose = require('mongoose');
// require('dotenv').config();

const { mongoUrl, mongoParams } = require('./utils/mongo-params');

const PORT = process.env.PORT || 3000;

const app = express();

const router = require('./routes');

mongoose.connect(mongoUrl, mongoParams);

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`App listening port ${PORT}`);
});
