const { generateThumbnail } = require('./use-cases/generate-thumbnail');
const { uploadImage } = require('./use-cases/upload-image');
const { searchImage } = require('./use-cases/search-image');
const { deleteImage } = require('./use-cases/delete-image');

module.exports = {
  generateThumbnail, uploadImage, searchImage, deleteImage,
};
