const log = console.log.bind(console);
const error = console.error.bind(console);
const info = console.info.bind(console);
console.log = (...args) => log(new Date().toLocaleString(), ':: LOG   ::', ...args);
console.error = (...args) => error(new Date().toLocaleString(), ':: ERROR ::', ...args);
console.info = (...args) => info(new Date().toLocaleString(), ':: INFO  ::', ...args);
