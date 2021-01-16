/* eslint-disable no-console */
const { searchImages } = require('../lib/s3');
const { success, error, parseImageList } = require('../utils');
const { BUCKET } = require('../constants');

const searchImage = async (event) => {
  const { queryStringParameters } = event;
  try {
    let list = await searchImages(BUCKET, queryStringParameters);
    list = parseImageList(list.Contents || []);
    return success({ list });
  } catch (err) {
    console.log(err);
    return error(500, err);
  }
};

module.exports = { searchImage };
