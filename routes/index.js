const router = require('express').Router();

const users = require('./users');
const cards = require('./cards');
const auth = require('../middlewares/auth');

const { login } = require('../controllers/users');

router.use('/users', auth, users);
router.use('/cards', auth, cards);

router.post('/signin', login);

module.exports = router;
