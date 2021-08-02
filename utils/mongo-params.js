const { NODE_ENV, DATABASE_URL } = process.env;
const mongoUrl = NODE_ENV === 'production' ? DATABASE_URL : 'mongodb://localhost:27017/filmsexplorer';
const mongoParams = { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false };

module.exports = {
  mongoUrl, mongoParams,
};
