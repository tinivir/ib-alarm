const addon = require('ibapi');

const createContract = contract => {
  const currentContract = addon.contract.createContract();
  currentContract.symbol = contract.symbol;
  currentContract.secType = contract.secType;
  currentContract.exchange = contract.exchange;
  currentContract.primaryExchange = contract.primaryExchange;
  currentContract.currency = contract.currency;
  if (contract.lastTradeDateOrContractMonth) {
    currentContract.lastTradeDateOrContractMonth = contract.lastTradeDateOrContractMonth;
  }

  return currentContract;
};

module.exports = {
  createContract
};
