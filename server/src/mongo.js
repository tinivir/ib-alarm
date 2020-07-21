const mongoose = require('mongoose');

const { MONGO_PORT, MONGO_HOST, MONGO_DB } = process.env;
mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', error => console.error(`mongodb is not connected`, error));
db.once('open', () => console.log(`mongodb is connected, port=${MONGO_PORT}, db=${MONGO_DB}`));
