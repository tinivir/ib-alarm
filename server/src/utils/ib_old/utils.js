const addon = require('ibapi');
const { RateLimiter } = require('limiter');

const api = new addon.NodeIbapi();
let orderId = -1;
let reqId = 1;

api.limiter = new RateLimiter(5000, 'second');
api.handlers[addon.messageIds.nextValidId] = m => (orderId = m.orderId);

const getNextReqId = () => reqId++;

const events = {};

const dispatch = messageId => data => {
  if (!data.reqId) {
    if (events[messageId]) {
      Object.keys(events[messageId]).forEach(reqId => {
        dispatch(messageId)({ ...data, reqId });
      });
    }
    return;
  }

  if (events[messageId] && events[messageId][data.reqId]) {
    events[messageId][data.reqId](data);
  }
};

const addEventListener = (reqId, messageId, listener) => {
  if (!events[messageId]) {
    events[messageId] = {};
    api.handlers[messageId] = dispatch(messageId);
  }

  events[messageId][reqId] = listener;
};

const removeEventListener = (reqId, messageId) => {
  if (!messageId) {
    Object.keys(events).forEach(messageId => removeEventListener(reqId, messageId));
    return;
  }

  if (!events[messageId]) {
    return;
  }

  if (!reqId) {
    Object.keys(events[messageId]).forEach(reqId => removeEventListener(reqId, messageId));
    return;
  }

  delete events[messageId][reqId];

  if (!Object.keys(events[messageId])) {
    api.handlers[messageId] = null;
    delete events[messageId];
  }
};

const getDurationDays = ({ bar, bars }) => {
  let days;
  const [num, time] = bar.split(' ');
  if (time === 'month') {
    days = 30;
  } else if (time === 'week') {
    days = 7;
  } else if (time === 'day') {
    days = 1;
  } else if (time.includes('hour')) {
    days = 1 / 8;
  } else if (time.includes('min')) {
    days = 1 / 8 / 60;
  } else if (time.includes('sec')) {
    days = 1 / 8 / 60 / 60;
  }

  return Math.ceil(days * num * bars);
};

module.exports = {
  api,
  addEventListener,
  removeEventListener,
  getDurationDays,
  getNextReqId
};
