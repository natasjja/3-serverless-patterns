"use strict";

const AWS = require("aws-sdk");
const sns = new AWS.SNS();

module.exports.handler = (event, context, callback) => {
  const message = event.Records[0].Sns.Message;
  const data = JSON.parse(message);

  const params = {
    Message: `Hi ${data.fullName} 👋 Thanks for registering!`,
    PhoneNumber: data.phone,
  };

  const publishTextPromise = sns.publish(params).promise();

  publishTextPromise
    .then((data) => console.log("MessageID is ", data.MessageId))
    .catch((err) => console.error(err, err.stack));
};
