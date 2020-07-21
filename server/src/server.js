require('./utils/console');
const app = require('./app');

const { PORT } = process.env;

const server = app.listen(PORT, () => {
  console.log(`app is working on port ${PORT}...`);
});

server.on('timeout', () => {
  console.error('server Timeout', server.timeout);
});

server.setTimeout(5 * 1000 * 60 * 60);
