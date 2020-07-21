const parseError = error => {
  let message;
  try {
    message = JSON.parse(error.message ? error.message : error);
  } catch (e) {
    message = error.message ? error.message : error;
  }
  return message;
};

const handleError = (err, req, res, next) => {
  const status = err.statusCode || 400;
  console.error(err.stack || err);
  res.status(status).send({
    ok: false,
    error: parseError(err)
  });
};

module.exports = handleError;
