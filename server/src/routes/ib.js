const { Router } = require('express');
const { getStatus, connect, feed } = require('../utils/ib');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const status = getStatus();
    const { toggledFeedOn } = feed.getStatus();

    res.status(200).json({ ...status, toggledFeedOn });
  } catch (e) {
    return next(e);
  }
});

router.post('/connect', async (req, res, next) => {
  try {
    await connect(req.body);

    res.status(200).json(getStatus());
  } catch (e) {
    return next(e);
  }
});

router.get('/historical-data', async (req, res, next) => {
  try {
    const data = await feed.getData();

    res.status(200).json(data);
  } catch (e) {
    return next(e);
  }
});

router.post('/feed', async (req, res, next) => {
  const { toggledFeedOn } = req.body;
  try {
    feed.toggle(toggledFeedOn);
    res.status(200).json(feed.getStatus());
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
