'use strict';

module.exports.processImage = async (event, context, callback) => {
  console.log('The event Im logging:', JSON.stringify(event));
  callback(null, { message: 'Hi Im processImage function!'});
};
