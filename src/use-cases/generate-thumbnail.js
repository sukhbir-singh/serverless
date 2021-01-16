const sharp = require('sharp');

const { getS3Object, putS3Object } = require('../lib/s3');
const { THUMBNAIL_IMAGE_WIDTH, THUMBNAILS_PREFIX } = require('../constants');

const getThumbnailKey = (originalFileName) => {
  const fileName = originalFileName.split('/').pop();
  return `${THUMBNAILS_PREFIX}/${fileName}`;
};

const processFile = async (bucket, key) => {
  const imageObject = await getS3Object(bucket, key);
  const thumbnailData = await sharp(imageObject.Body).resize(THUMBNAIL_IMAGE_WIDTH).toBuffer();
  const thumbnailKey = getThumbnailKey(key);
  await putS3Object(bucket, thumbnailKey, thumbnailData);
};

const generateThumbnail = async (event) => {
  try {
    const { Records = [] } = event;
    const promises = [];
    Records.forEach((record) => {
      const { s3: { bucket: { name: bucketName }, object: { key } } } = record;
      promises.push(processFile(bucketName, key));
    });

    await Promise.all(promises);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  generateThumbnail,
};
