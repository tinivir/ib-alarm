let orderId = -1;

let api;

let reqId = 1;

const getNextReqId = () => reqId++;

const events = {};
const initializeApi = ({ host, port } = {}) => {
  api = new (require('ib'))({ host, port });
  api.on('nextValidId', o => {
    orderId = o;
  });

  return api;
};
initializeApi({ port: 4002 });

const getApi = () => api;

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
  getApi,
  initializeApi,
  getDurationDays,
  getNextReqId
};
