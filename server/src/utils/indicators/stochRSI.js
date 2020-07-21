const { StochasticRSI } = require('technicalindicators');

const stochRSI = (data, { period }) => {
  const values = data.map(d => d.close);

  const result = StochasticRSI.calculate({
    values,
    rsiPeriod: period,
    stochasticPeriod: period,
    kPeriod: 1,
    dPeriod: 1
  }).map(r => r.stochRSI / 100);

  return Array(values.length - result.length)
    .fill(undefined)
    .concat(result);
};

stochRSI.meta = {
  name: 'StochRSI',
  arguments: {
    period: {
      name: 'Period',
      default: 14
    }
  },
  minValue: 0,
  maxValue: 1,
  getMinBars: ({ period }) => period * 40
};

module.exports = {
  stochRSI
};
