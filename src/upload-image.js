const S3 = require('aws-sdk/clients/s3');

const s3 = new S3();
const { REGION: region, BUCKET: bucket } = process.env;

const uploadImage = async (event) => {
  const file = event.headers && event.headers['filename'] ? event.headers['filename']: undefined;
  if (!file) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Add header \'filename\' to request.',
      }),
    };
  }

  const params = {
    Bucket: bucket,
    Key: file,
    Expires: 30,
  };

  try {
    const url = await s3.getSignedUrl('putObject', params);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(url),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};

module.exports = { uploadImage };
