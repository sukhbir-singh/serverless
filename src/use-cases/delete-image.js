const { isFileExist, deleteImageFromS3 } = require('../lib/s3');
const { success, error } = require('../utils');
const { IMAGES_PREFIX, THUMBNAILS_PREFIX, BUCKET } = require('../constants');

const deleteImage = async (event) => {
  const { pathParameters } = event;
  if (!pathParameters || !pathParameters.name) {
    return error(400, 'Invalid file name');
  }

  const fileName = pathParameters.name;
  const imageKey = `${IMAGES_PREFIX}/${fileName}`;
  const thumbnailKey = `${THUMBNAILS_PREFIX}/${fileName}`;

  const isImageExist = await isFileExist(BUCKET, imageKey);
  const isThumbnailExist = await isFileExist(BUCKET, thumbnailKey);

  if (!isImageExist) {
    return error(400, 'No file exists with given input file name.');
  }

  // delete main image file
  await deleteImageFromS3(BUCKET, imageKey);

  // delete thumbnail image file
  if (isThumbnailExist) {
    await deleteImageFromS3(BUCKET, thumbnailKey);
  }

  return success({ success: true });
};

module.exports = { deleteImage };
