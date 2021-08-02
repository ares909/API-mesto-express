const Card = require('../models/card');
const messages = require('../utils/messages');
const NotFoundError = require('../errors/notfound');
const BadRequestError = require('../errors/badrequest');
const ConflictError = require('../errors/conflict');
const ForbiddenError = require('../errors/forbidden');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({
      name: card.name,
      link: card.link,
      _id: card._id,
      owner: card.owner,
      likes: card.likes,
      createdAt: card.createdAt,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError' || res.status === 400) {
        next(new BadRequestError(messages.card.isValid));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById({ _id: req.params.cardId })

    .orFail(() => new ForbiddenError(messages.card.id.cardNotFound))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError(messages.card.id.userNotFound);
      }
      return Card.deleteOne(card)
        .then(() => res.send({ message: messages.card.onDelete }))
        .catch((err) => {
          if (err.name === 'ValidationError' || err.name === 'CastError') {
            next(new BadRequestError(messages.card.isValid));
          } else {
            next(err);
          }
        });
    })

    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(() => new ForbiddenError(messages.card.id.cardNotFound))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(messages.card.isValid));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(() => new ForbiddenError(messages.card.id.cardNotFound))
    .then((card) => res.send(card)).catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(messages.card.isValid));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
