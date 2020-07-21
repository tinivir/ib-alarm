let wsInstance;

const setWS = ws => (wsInstance = ws);
const getWS = () => wsInstance.getWss();
const broadcastMessage = message => {
  const clients = wsInstance.getWss().clients;

  if (typeof message !== 'string') {
    message = JSON.stringify(message);
  }

  clients.forEach(client => {
    client.send(message);
  });
};

module.exports = {
  setWS,
  getWS,
  broadcastMessage
};
