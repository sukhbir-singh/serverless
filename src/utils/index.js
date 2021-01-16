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

const getOnlyFileName = (key) => key.split('/').pop();

const parseImageList = (list = []) => list.map((obj) => ({
  FileName: getOnlyFileName(obj.Key),
  Size: obj.Size,
  CreatedAt: new Date(obj.LastModified).toString(),
}));

module.exports = { success, error, parseImageList };
