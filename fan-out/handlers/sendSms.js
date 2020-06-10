"use strict";

const AWS = require("aws-sdk");
// AWS.config.update({ region: "us-east-1" });

module.exports.handler = (event, context, callback) => {
  const message = event.Records[0].Sns.Message;

  console.log("message", message);
  console.log("sendSms func", event);

  const params = {
    Message: "hello uuuuu",
    PhoneNumber: "0415143727",
  };

  const publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
    .publish(params)
    .promise();

  publishTextPromise
    .then((data) => console.log("MessageID is " + data.MessageId))
    .catch((err) => console.error(err, err.stack));
};
