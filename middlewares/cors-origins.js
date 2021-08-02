const router = require('express').Router();
const cors = require('cors');

const originList = [
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:3005',
  'https://localhost:3005',
];

router.use(
  cors({
    origin: originList,
    credentials: true,
  }),
);

module.exports = router;
