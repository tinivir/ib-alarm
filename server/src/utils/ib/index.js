const { getStatus, connect } = require('./connect');
const { getHistoricalData } = require('./getHistoricalData');
const { feed } = require('./feed');

module.exports = {
  getStatus,
  connect,
  getHistoricalData,
  feed
};
