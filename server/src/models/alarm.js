const mongoose = require('mongoose');

const AlarmSchema = new mongoose.Schema(
  {
    contract: {
      type: mongoose.ObjectId,
      required: true,
      ref: 'Contract'
    },
    indicatorName: {
      type: String,
      required: true
    },
    indicatorArguments: Object,
    operator: {
      type: String,
      required: true
    },
    bar: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: false,
      default: 0
    },
    enabled: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model('Alarm', AlarmSchema);
