const { messageIds } = require('ibapi');
const { api, addEventListener, removeEventListener } = require('./utils');
let lastHost, lastPort;

const connect = ({ host, port }) => {
  removeEventListener();
  addEventListener(null, messageIds.error, console.error);
  addEventListener(null, messageIds.clientError, console.error);
  const connected = api.connect(host, +port, 0, false);
  if (connected) {
    console.log(`IB is connected, host=${host}, port=${port}`);
    api.beginProcessing();
    lastHost = host;
    lastPort = +port;
  } else {
    console.error(`IB is not connected, host=${host}, port=${port}`);
  }
  return connected;
};

// TODO remove
// connect({ host: '127.0.0.1', port: 4002 });

const getStatus = () => ({
  host: lastHost,
  port: lastPort,
  connected: api.isConnected()
});

module.exports = {
  getStatus,
  connect
};
