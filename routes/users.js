const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validateUrl } = require('../utils/validation');
const {
  getUserById, changeUser, getUser, changeUserAvatar,
} = require('../controllers/users');

// router.get('/', getUsers);
router.get('/me', getUser);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi
      .string()
      .trim(true)
      .required()
      .min(2)
      .max(30),
    about: Joi
      .string()
      .trim(true)
      .required()
      .min(2)
      .max(30),
  }),
}), changeUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().trim(true).custom(validateUrl, 'custom validation'),
  }),
}), changeUserAvatar);

module.exports = router;
