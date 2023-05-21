const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404); // 404 is not found
  next(error); // pass error to error handler
}

const errorHandler = (err, req, res, next) => {
  // sometimes we get 200 status code even if there is an error
  // so we set the status code to 500 if it is 200
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if(err.name === 'CasteError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Invalid ID';
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
}

export {notFound, errorHandler};