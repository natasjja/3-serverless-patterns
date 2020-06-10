"use strict";

const AWS = require("aws-sdk");

module.exports.handler = (event, context, callback) => {
  const message = event.Records[0].Sns.Message;

  console.log("message from sendSms", message);
  console.log("sendSms func", event);

  //   const params = {
  //     Message: "hello uuuuu",
  //     PhoneNumber: "",
  //   };

  //   const publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
  //     .publish(params)
  //     .promise();

  //   publishTextPromise
  //     .then((data) => console.log("MessageID is " + data.MessageId))
  //     .catch((err) => console.error(err, err.stack));
};
