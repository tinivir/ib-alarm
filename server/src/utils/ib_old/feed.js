const { checkAlarms } = require('../alarm');
const { broadcastMessage } = require('../../utils/ws');
const { getHistoricalData } = require('./getHistoricalData');
const { addIndicator, getMinBars } = require('../indicators');
const { Alarm } = require('../../models');

let intervalId;
let interval = 15000;

const getData = async () => {
  const alarms = await Alarm.find({ enabled: true }).populate('contract');

  const cache = {};
  alarms.forEach(alarm => {
    const key = `${alarm.contract._id}${alarm.bar}`;
    const bars = Math.max(getMinBars(alarm), cache[key] ? cache[key].bars : 0);
    cache[key] = { contract: alarm.contract, bar: alarm.bar, bars };
  });
  const feeds = Object.values(cache);

  return Promise.all(feeds.map(feed => getHistoricalData(feed))).then(results =>
    results.map(({ bar, contract, data }) => {
      const filteredAlarms = alarms.filter(alarm => alarm.contract === contract && alarm.bar === bar);

      filteredAlarms.forEach(alarm => {
        data = addIndicator(data, alarm.indicatorName, alarm.indicatorArguments);
      });

      return { bar, contract, data, alarms: filteredAlarms };
    })
  );
};

const feedInterval = async () => {
  let feeds;
  try {
    feeds = await getData();
  } catch (error) {
    if (error.errorCode === 504 && error.errorString === 'Not connected') {
      toggle(false);
    }

    broadcastMessage({
      error
    });
    return;
  }

  const feedWithLastData = feeds.map(({ data, ...rest }) => ({ data: data[data.length - 1], ...rest }));

  broadcastMessage({ feeds: feedWithLastData });

  checkAlarms(feedWithLastData);
};

const getStatus = () => ({
  toggledFeedOn: !!intervalId
});

const toggle = toggledFeedOn => {
  if (toggledFeedOn === getStatus().toggledFeedOn) return;

  if (toggledFeedOn) {
    intervalId = setInterval(feedInterval, interval);
    feedInterval();
  } else {
    clearInterval(intervalId);
    intervalId = null;
  }
  return true;
};

module.exports = {
  feed: {
    getStatus,
    toggle,
    getData
  }
};
