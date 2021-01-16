const S3 = require('aws-sdk/clients/s3');

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

module.exports = { getS3Object, getSignedUrl, putS3Object };
