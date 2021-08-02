const router = require('express').Router();

const cookieParser = require('./cookie-parser');
const cors = require('./cors-origins');
const helmet = require('./helmet');
const limiter = require('./limiter');

router.use(cookieParser);
router.use(cors);
router.use(helmet);
router.use(limiter);

module.exports = router;
