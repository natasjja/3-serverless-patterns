'use strict';

module.exports.resizeImage = async (event, context, callback) => {
  console.log('The event Im logging:', JSON.stringify(event));
  callback(null, { message: 'Hi Im resizeImage function!'});
};
