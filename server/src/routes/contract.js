const { Router } = require('express');
const { Contract } = require('../models');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const contracts = await Contract.find();

    console.log(contracts);

    res.status(200).json(contracts);
  } catch (e) {
    return next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const contract = await Contract.findOne({ _id: req.params.id });

    res.status(200).json(contract);
  } catch (e) {
    return next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const contract = await Contract.deleteOne({ _id: req.params.id });

    res.status(204).json(contract);
  } catch (e) {
    return next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { ok } = await Contract.updateOne({ _id: req.params.id }, { $set: req.body });
    if (!ok) {
      return next(new Error('Update error'));
    }

    res.status(200).json(await Contract.findOne({ _id: req.params.id }));
  } catch (e) {
    return next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const contractModel = new Contract(req.body);
    const contract = await contractModel.save();

    res.status(201).json(contract);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;
