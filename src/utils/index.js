const { ERROR_CODES } = require('../constants');

const success = (body = {}) => ({
  statusCode: ERROR_CODES.SUCCESS,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
  body: JSON.stringify(body),
});

const error = (code = ERROR_CODES.CLIENT_ERROR, message) => ({
  statusCode: code,
  body: JSON.stringify({ message }),
});

module.exports = { success, error };
