function errorHandler(err, req, res, next) {
  // log full error for debugging
  console.error('ERROR:', err && (err.stack || err.message || err));
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  if (process.env.NODE_ENV === 'development') {
    return res.status(status).json({ success: false, message, stack: err.stack });
  }
  return res.status(status).json({ success: false, message });
}
module.exports = errorHandler;
