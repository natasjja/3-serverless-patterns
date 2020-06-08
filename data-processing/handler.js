'use strict';

const AWS = require('aws-sdk');
const Sharp = require('sharp');
const s3 = new AWS.S3();

const RESIZED_BUCKET = process.env.RESIZED_IMAGE_BUCKET;

module.exports.resizeImage = async (event, context, callback) => {

  const s3Object = event.Records[0].s3;
  const uploadBucket = s3Object.bucket.name;
  const imageKey = decodeURIComponent(s3Object.object.key.replace(/\+/g, ' '));
 
  const response = await s3
    .getObject({ Bucket: uploadBucket, Key: imageKey })
    .promise();

  console.log(`Resizing image ${imageKey}`);

  const resizedImageBuffer = await Sharp(response.Body)
    .resize(200)
    .toBuffer();

  await s3
    .putObject({
      Bucket: RESIZED_BUCKET,
      Key: makeFileName(imageKey),
      Body: resizedImageBuffer,
      ContentType: response.ContentType,
    })
    .promise();
};

const makeFileName = (imageKey) => {
  const imageKeyParts = imageKey.split('.');
  return `${imageKeyParts[0]}-resized.${imageKeyParts[1]}`;
}