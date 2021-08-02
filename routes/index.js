const router = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const { validatePassword } = require('../utils/validation');
const { errorHandler } = require('../middlewares/error-handler');
const middlewares = require('../middlewares');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const NotFoundError = require('../errors/notfound');
const messages = require('../utils/messages');

const users = require('./users');
const cards = require('./cards');
const auth = require('../middlewares/auth');

const { login, createUser, logout } = require('../controllers/users');

router.use(requestLogger);
router.use(middlewares);
router.use('/users', auth, users);
router.use('/cards', auth, cards);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(validatePassword, 'custom validation'),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().required().trim(true),
    email: Joi.string().required().email().trim(true),
    password: Joi.string().required().min(8).trim(true)
      .custom(validatePassword, 'custom validation'),
  }),
}), createUser);
router.post('/logout', logout);

router.use('*', auth, () => {
  throw new NotFoundError(messages.route.isExist);
});
router.use(errorLogger);
router.use(errors());
router.use(errorHandler);

module.exports = router;
