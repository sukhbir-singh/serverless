const ERROR_CODES = {
  SUCCESS: 200,
  CLIENT_ERROR: 400,
  SERVER_ERROR: 500,
};

const ERROR_MESSAGE = {
  INVALID_FILE_NAME: 'Invalid file name',
  FILE_NOT_EXIST: 'No file exists with given input file name.',
  HEADER_MISSING_FILENAME: 'Missing \'filename\' from header request.',
};

const { REGION, BUCKET } = process.env;

const IMAGES_PREFIX = 'images';
const THUMBNAILS_PREFIX = 'thumbnails';

const THUMBNAIL_IMAGE_WIDTH = 400;

module.exports = {
  ERROR_CODES,
  ERROR_MESSAGE,
  REGION,
  BUCKET,
  IMAGES_PREFIX,
  THUMBNAILS_PREFIX,
  THUMBNAIL_IMAGE_WIDTH,
};
