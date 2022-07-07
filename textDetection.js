require('dotenv').config();

const vision = require('@google-cloud/vision');
const res = require('express/lib/response');


async function textDetect(photo){
  const client = new vision.ImageAnnotatorClient();

  let number = 0;

  await client
    .textDetection(photo)
    .then(async (res) => {
      const result = res[0].textAnnotations;
    
      this.number = await result[0].description;
      console.log(this.number);
    // console.log('-----------------');
    // console.log(`Text Annotation result : ${JSON.stringify(result, "description", 2)}`);
    })
    .catch(err => {
      console.error('Error : ', err);
    })

    return this.number;
}

  exports.textDetect = textDetect;