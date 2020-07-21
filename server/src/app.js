require('dotenv').config();
require('./mongo');

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
const { setWS } = require('./utils/ws');
const wsInstance = require('express-ws')(app);
setWS(wsInstance);

const ib = require('./routes/ib');
const contract = require('./routes/contract');
const indicator = require('./routes/indicator');
const alarm = require('./routes/alarm');
const ws = require('./routes/ws');
const requestLogger = require('./middleware/requestLogger');
const handleError = require('./middleware/errorHandler');

app.use(express.static('../front/build'));
app.use('/status', require('express-healthcheck')());

app.use(requestLogger);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use('/api/ib', ib);
app.use('/api/contract', contract);
app.use('/api/indicator', indicator);
app.use('/api/alarm', alarm);
app.use('/ws', ws);

app.use('*', async (req, res) =>
  res.status(404).send({
    error: {
      message: 'route not found'
    }
  })
);

app.use(methodOverride());
app.use(handleError);

module.exports = app;
