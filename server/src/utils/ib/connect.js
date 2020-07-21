const { getApi, initializeApi } = require('./utils');

const connect = ({ host, port }) =>
  new Promise((resolve, reject) => {
    const onError = error => finish(reject, error);
    const onConnect = data => finish(resolve, data);

    const finish = (f, ...args) => {
      console.log('finish', f);

      getApi().removeListener('error', onError);
      getApi().removeListener('connected', onConnect);

      f(...args);
    };

    initializeApi({ host, port })
      .on('error', onError)
      .on('connected', onConnect)
      .connect();
  });

// TODO remove
// connect({ host: '127.0.0.1', port: 4002 });

const getStatus = () => {
  const { options, _socket } = getApi()._controller;
  return {
    ...options,
    connected: _socket._connected
  };
};

module.exports = {
  getStatus,
  connect
};
