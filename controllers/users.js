require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const messages = require('../utils/messages');
const NotFoundError = require('../errors/notfound');
const BadRequestError = require('../errors/badrequest');
const ConflictError = require('../errors/conflict');

const SALT_LENGHT = 10;
const MONGO_DUPLICATE_ERROR_CODE = 11000;
const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const {
    name, about, avatar, password, email,
  } = req.body;
  if (!email || !password) {
    throw new BadRequestError(messages.user.allFilled);
  }

  bcrypt.hash(req.body.password, SALT_LENGHT).then((hash) => User.create({
    name, about, avatar, password: hash, email,
  }))
    .then((user) => res.send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))

    .catch((err) => {
      if (err.code === MONGO_DUPLICATE_ERROR_CODE && err.name === 'MongoError') {
        next(new ConflictError(messages.user.sameData));
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(messages.user.isValid));
      } else {
        next(err);
      }
    });
};

const changeUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    { _id: req.user._id },
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  ).then((user) => res.send(user)).catch((err) => {
    if (err.code === MONGO_DUPLICATE_ERROR_CODE && err.name === 'MongoError') {
      next(new ConflictError(messages.user.sameData));
    } else if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new BadRequestError(messages.user.isValid));
    } else {
      next(err);
    }
  });
};

const changeUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    { _id: req.user._id },
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  ).then((user) => res.send(user)).catch((err) => {
    if (err.code === MONGO_DUPLICATE_ERROR_CODE && err.name === 'MongoError') {
      next(new ConflictError(messages.user.sameData));
    } else if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new BadRequestError(messages.user.isValid));
    } else {
      next(err);
    }
  });
};

const getUserById = (req, res, next) => {
  User.findOne({ _id: req.params.userId })

    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotFoundError(messages.user.id.userNotFound));
      }
    });
};

const getUser = (req, res, next) => {
  User.findOne({ _id: req.user })
    .orFail(() => new NotFoundError(messages.user.id.userNotFound))
    .then((user) => res.send({ name: user.name, email: user.email }))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });

      res.send({ token });
    })
    .catch(next);
};

const logout = (req, res) => {
  res.cookie('jwt', 'token', {
    maxAge: 0,
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  }).end();
};

module.exports = {
  createUser, getUserById, login, changeUser, getUser, logout, changeUserAvatar,
};
