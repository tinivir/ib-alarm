const { Router } = require('express');
const { Alarm } = require('../models');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const alarms = await Alarm.find().populate('contract');

    console.log(alarms);

    res.status(200).json(alarms);
  } catch (e) {
    return next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const alarm = await Alarm.findOne({ _id: req.params.id }).populate('contract');

    res.status(200).json(alarm);
  } catch (e) {
    return next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const alarm = await Alarm.deleteOne({ _id: req.params.id });

    res.status(204).json(alarm);
  } catch (e) {
    return next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { ok } = await Alarm.updateOne({ _id: req.params.id }, { $set: req.body });
    if (!ok) {
      return next(new Error('Update error'));
    }

    res.status(200).json(await Alarm.findOne({ _id: req.params.id }).populate('contract'));
  } catch (e) {
    return next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const alarmModel = new Alarm(req.body);
    const alarm = await alarmModel.save();

    res.status(201).json(await Alarm.findOne({ _id: alarm._id }).populate('contract'));
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;
