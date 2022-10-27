require('dotenv').config();

const vision = require('@google-cloud/vision');

async function textDetect(photo){
  const client = new vision.ImageAnnotatorClient();

  const number = await client
    .textDetection(photo)
    .then(async (res) => {
      const result = res[0].textAnnotations;

      return result[0].description;
    })
    .catch(err => {
      console.error('Error : ', err);
    })

    return number;
}

exports.textDetect = textDetect;