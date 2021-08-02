const jwt = require('jsonwebtoken');
const messages = require('../utils/messages');
const BadRequestError = require('../errors/badrequest');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new BadRequestError(messages.login.notLogged));
    // return next(token);
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(BadRequestError(messages.login.notLogged));
  }

  req.user = payload;

  return next();
};
