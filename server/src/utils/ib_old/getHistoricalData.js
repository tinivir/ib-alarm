const addon = require('ibapi');
const { api, getNextReqId, addEventListener, removeEventListener, getDurationDays } = require('./utils');
const { createContract } = require('./contract');

const mapData = ({ date, open, high, low, close, volume, WAP }) => ({
  date: new Date(`${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6)}`),
  open,
  high,
  low,
  close,
  volume,
  WAP
});

const getHistoricalData = ({ contract, bar, bars }) => {
  const ibContract = createContract(contract);
  const reqId = getNextReqId();
  const duration = getDurationDays({ bar, bars });

  return new Promise((resolve, reject) => {
    const finish = (f, ...args) => {
      removeEventListener(reqId);
      f(...args);
    };

    const result = [];

    addEventListener(
      reqId,
      addon.messageIds.historicalData,

      data => {
        if (data.date.toString().includes('finished')) {
          finish(resolve, {
            contract,
            bar,
            data: result
          });
        } else {
          result.push(mapData(data));
        }
      }
    );

    addEventListener(reqId, addon.messageIds.error, error => finish(reject, error));
    addEventListener(reqId, addon.messageIds.clientError, error => finish(reject, error));

    api.reqHistoricalData(
      reqId,
      ibContract,
      '',
      duration > 365 ? Math.ceil(duration / 365) + ' Y' : duration + ' D',
      bar,
      'TRADES',
      '1',
      '1'
    );
  });
};

module.exports = {
  getHistoricalData
};
