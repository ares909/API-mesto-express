const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const messages = require('../utils/messages');
const UnauthorizedError = require('../errors/unauthorized');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Пей Мей',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Носитель кантонского диалекта',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (str) => validator.isURL(str),
      message: messages.user.isValid,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (str) => validator.isEmail(str),
      message: messages.user.isEmailValid,
    },
  },
  __v: {
    type: Number,
    select: false,
  },

});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(messages.login.isValid);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(messages.login.isValid);
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
