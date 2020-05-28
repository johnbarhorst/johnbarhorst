exports.catchErrors = fn => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
};


// Catch pages that aren't found
exports.notFound = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
}


// Dev error handling. Highlight stack traces for readability.
exports.developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || '';
  console.log('Stack stuff:', err.stack);
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
  };
  res.status(err.status || 500);
  res.json(errorDetails);
};


// Production Error Handler
// No stacktraces are leaked to user
exports.productionErrors = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message
  })
};