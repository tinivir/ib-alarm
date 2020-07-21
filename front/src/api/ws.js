let ws;

export const connect = onMessage =>
  new Promise((resolve, reject) => {
    ws = new WebSocket(`ws://${window.location.host}/ws`);
    ws.addEventListener('open', resolve);
    ws.addEventListener('message', onMessage);
  });

export const disconnect = () => {
  if (ws) {
    ws.close();
  }

  return (ws = null);
};
