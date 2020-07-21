const { getApi, getNextReqId, getDurationDays } = require('./utils');

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
  const reqId = getNextReqId();
  const api = getApi();
  const duration = getDurationDays({ bar, bars });

  return new Promise((resolve, reject) => {
    const finish = (f, ...args) => {
      api.removeListener('historicalData', onData);
      api.removeListener('error', onError);
      f(...args);
    };

    const result = [];

    const onData = (receivedReqId, date, open, high, low, close, volume, barCount, WAP, hasGaps) => {
      if (reqId !== receivedReqId) return;
      if (date.toString().includes('finished')) {
        finish(resolve, {
          contract,
          bar,
          data: result
        });
      } else {
        result.push(mapData({ date, open, high, low, close, volume, barCount, WAP, hasGaps }));
      }
    };

    const onError = error => {
      finish(reject, error);
    };

    api.on('historicalData', onData);
    api.on('error', onError);

    api.reqHistoricalData(
      reqId,
      JSON.parse(JSON.stringify(contract)),
      '',
      duration > 365 ? Math.ceil(duration / 365) + ' Y' : duration + ' D',
      bar,
      'TRADES',
      1,
      1,
      false
    );
  });
};

module.exports = {
  getHistoricalData
};
