const S3 = require('aws-sdk/clients/s3');

const { IMAGES_PREFIX } = require('../constants');

const s3 = new S3();

const getS3Object = async (bucket, key) => {
  const params = {
    Bucket: bucket,
    Key: key,
  };
  const result = await s3.getObject(params).promise();
  return result;
};

const getSignedUrl = async (bucket, key) => {
  const params = {
    Bucket: bucket,
    Key: key,
    Expires: 60,
  };
  const url = await s3.getSignedUrl('putObject', params);
  return url;
};

const putS3Object = async (bucket, key, body, contentType = 'image') => {
  const params = {
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
  };
  await s3.putObject(params).promise();
};

const searchImages = async (bucket, queryParams) => {
  const { name } = queryParams || {};
  const params = {
    Bucket: bucket,
    Prefix: `${IMAGES_PREFIX}/${name || ''}`,
  };
  return s3.listObjectsV2(params).promise();
};

const isFileExist = async (bucket, key) => {
  try {
    const params = {
      Bucket: bucket,
      Key: key,
    };
    await s3.headObject(params).promise();
    return true;
  } catch (err) {
    return false;
  }
};

const deleteImageFromS3 = async (bucket, key) => {
  const params = {
    Bucket: bucket,
    Key: key,
  };
  const response = await s3.deleteObject(params).promise();
  return response;
};

module.exports = {
  getS3Object, getSignedUrl, putS3Object, searchImages, isFileExist, deleteImageFromS3,
};
