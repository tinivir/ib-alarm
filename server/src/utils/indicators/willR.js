const { WilliamsR } = require('technicalindicators');

const willR = (data, { period }) => {
  const close = data.map(d => d.close);
  const low = data.map(d => d.low);
  const high = data.map(d => d.high);

  const result = WilliamsR.calculate({
    low,
    high,
    close,
    period
  });

  return Array(close.length - result.length)
    .fill(undefined)
    .concat(result);
};

willR.meta = {
  name: 'Will %R',
  arguments: {
    period: {
      name: 'Period',
      default: 14
    }
  },
  minValue: -100,
  maxValue: 100,
  getMinBars: ({ period }) => period + 1
};
module.exports = {
  willR
};
