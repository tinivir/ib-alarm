const { stochRSI } = require('./stochRSI');
const { willR } = require('./willR');

const indicators = {
  StochRSI: stochRSI,
  'Will %R': willR
};

const addIndicator = (data, indicatorName, indicatorArguments) => {
  const result = indicators[indicatorName](data, indicatorArguments);

  return data.map((d, i) => ({
    ...d,
    [indicatorName]: Math.round(result[i] * 100) / 100
  }));
};

const getIndicators = () => Object.values(indicators).map(i => i.meta);
const getMinBars = ({ indicatorName, indicatorArguments }) =>
  indicators[indicatorName].meta.getMinBars(indicatorArguments);

module.exports = {
  addIndicator,
  getIndicators,
  getMinBars,
  indicators
};
