const { response } = require('express');
const ApiError = require('./ApiError');

function errorHandler(error, request, response) {
  console.error(error);

  if (error instanceof ApiError) {
    response.status(error.code).json(error.message);
    return;
  }

  response.status(500).json('something went wrong');
}

module.exports = errorHandler;
