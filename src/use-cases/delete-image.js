const { isFileExist, deleteImageFromS3 } = require('../lib/s3');
const { success, error } = require('../utils');
const {
  IMAGES_PREFIX, THUMBNAILS_PREFIX, BUCKET, ERROR_MESSAGE,
} = require('../constants');

const deleteImage = async (event) => {
  const { pathParameters } = event;
  if (!pathParameters || !pathParameters.name) {
    return error(400, ERROR_MESSAGE.INVALID_FILE_NAME);
  }

  const fileName = pathParameters.name;
  const imageKey = `${IMAGES_PREFIX}/${fileName}`;
  const thumbnailKey = `${THUMBNAILS_PREFIX}/${fileName}`;

  const isImageExist = await isFileExist(BUCKET, imageKey);
  const isThumbnailExist = await isFileExist(BUCKET, thumbnailKey);

  if (!isImageExist) {
    return error(400, ERROR_MESSAGE.FILE_NOT_EXIST);
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
