require('dotenv').config();

const { NODE_ENV, DB_USER, DB_PASSWORD } = process.env;
const mongoUrl = NODE_ENV === 'production' ? `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.earva.mongodb.net/myFirstDatabase?retryWrites=true&w=majority` : 'mongodb://localhost:27017/mesto-app-db';
const mongoParams = { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false };

module.exports = {
  mongoUrl, mongoParams,
};
