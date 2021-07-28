const User = require('../models/user');

const getUsers = (req, res, next) => {
  User.find({}).then((users) => res.send(users).catch(next));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = { getUsers, createUser };
