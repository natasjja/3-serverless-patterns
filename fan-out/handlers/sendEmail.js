"use strict";

const AWS = require("aws-sdk");

module.exports.handler = (event, context, callback) => {
  const message = event.Records[0].Sns.Message;

  console.log("message from sendEmail", message);
  console.log("sendSms func", event);
};
