const logMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    console.info(`${req.method} ${req.originalUrl} : status ${res.statusCode}, ${Date.now() - start}ms`);
  });

  next();
};

module.exports = logMiddleware;
