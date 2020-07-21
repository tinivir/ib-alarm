const { checkAlarms } = require('../alarm');
const { broadcastMessage } = require('../../utils/ws');
const { getHistoricalData } = require('./getHistoricalData');
const { addIndicator, getMinBars } = require('../indicators');
const { Alarm } = require('../../models');

let toggledWorker = false;

const sleep = time => new Promise(res => setTimeout(res), time);

const worker = async () => {
  while (true) {
    if (!toggledWorker) {
      await sleep(3000);
      continue;
    }

    await feedJob();
  }
};
worker().catch(e => console.error('WORKER FAIL', e));

const getData = async () => {
  const alarms = await Alarm.find({ enabled: true }).populate('contract');

  const cache = {};
  alarms.forEach(alarm => {
    const key = `${alarm.contract._id}${alarm.bar}`;
    const bars = Math.max(getMinBars(alarm), cache[key] ? cache[key].bars : 0);
    cache[key] = { contract: alarm.contract, bar: alarm.bar, bars };
  });
  const feeds = Object.values(cache);

  const results = [];
  for (const feed of feeds) {
    let { bar, contract, data } = await getHistoricalData(feed);

    const filteredAlarms = alarms.filter(alarm => alarm.contract === contract && alarm.bar === bar);

    filteredAlarms.forEach(alarm => {
      data = addIndicator(data, alarm.indicatorName, alarm.indicatorArguments);
    });

    results.push({ bar, contract, data, alarms: filteredAlarms });
  }

  return results;
};

const feedJob = async () => {
  let feeds;
  try {
    feeds = await getData();
  } catch (error) {
    if (error === 'Cannot send data when disconnected.') {
      await toggle(false);
    }

    broadcastMessage({
      error: typeof error === 'string' ? { message: error } : error
    });
    return;
  }

  const feedWithLastData = feeds.map(({ data, ...rest }) => ({ data: data[data.length - 1], ...rest }));

  broadcastMessage({ feeds: feedWithLastData });

  await checkAlarms(feedWithLastData);
};

const getStatus = () => ({ toggledFeedOn: toggledWorker });

const toggle = toggledFeedOn => {
  toggledWorker = toggledFeedOn;
};

module.exports = {
  feed: {
    getStatus,
    toggle,
    getData
  }
};
