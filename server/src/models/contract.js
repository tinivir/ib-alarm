const mongoose = require('mongoose');

const ContractSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true
    },
    secType: {
      type: String,
      required: false,
      default: 'STK'
    },
    exchange: {
      type: String,
      required: false,
      default: 'SMART'
    },
    primaryExchange: {
      type: String,
      required: false
    },
    currency: {
      type: String,
      required: false,
      default: 'USD'
    },
    lastTradeDateOrContractMonth: {
      type: String,
      required: false
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model('Contract', ContractSchema);
