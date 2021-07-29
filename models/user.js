const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const messages = require('../utils/messages');
const UnauthorizedError = require('../errors/unauthorized');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
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
