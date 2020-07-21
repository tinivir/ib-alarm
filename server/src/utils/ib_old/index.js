const { getStatus, connect } = require('./connect');
const { createContract } = require('./contract');
const { getHistoricalData } = require('./getHistoricalData');
const { feed } = require('./feed');

module.exports = {
  getStatus,
  connect,
  createContract,
  getHistoricalData,
  feed
};
