/* eslint-disable no-console */
const { getSignedUrl } = require('../lib/s3');
const { success, error } = require('../utils');
const { IMAGES_PREFIX, BUCKET } = require('../constants');

const uploadImage = async (event) => {
  const { headers } = event;
  const inputFileName = headers && headers.filename ? headers.filename : undefined;
  if (!inputFileName) {
    return error(400, 'Add header \'filename\' to request.');
  }

  try {
    const url = await getSignedUrl(BUCKET, `${IMAGES_PREFIX}/${inputFileName}`);
    return success({ 'signed-url': url });
  } catch (err) {
    console.log(err);
    return error(400, err);
  }
};

module.exports = { uploadImage };
