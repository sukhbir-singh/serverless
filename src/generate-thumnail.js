// const sharp = require('sharp');
const fs = require('fs');

const generateThumbnail = async (event) => {  
  try {
    console.log('event: ', JSON.stringify(event));
    // const thumbnail = await sharp('/Users/user/image.jpg').resize(350).toBuffer();
    // let options = { jpegOptions: { quality: 90 } }
    // fs.writeFileSync('/Users/user/thumb.jpg', thumbnail);
  } catch (err) {
      console.error(err);
  }
};

module.exports = {
  generateThumbnail,
};
