const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({}).then((cards) => res.send(cards).catch(next));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner }).then((card) => res.send(card).catch(next));
};

module.exports = { getCards, createCard };
