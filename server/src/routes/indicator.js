const { Router } = require('express');
const { getIndicators } = require('../utils/indicators');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    res.status(200).json(getIndicators());
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
