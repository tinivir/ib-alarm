const { broadcastMessage } = require('../utils/ws');
const { Router } = require('express');

const router = Router();

router.ws('/', function(ws, req) {
  console.log('client connected');
});

module.exports = router;
