"use strict";

const AWS = require("aws-sdk");
const ses = new AWS.SES();

const { SENDER_EMAIL } = process.env;

module.exports.handler = (event, context, callback) => {
  const message = event.Records[0].Sns.Message;
  const data = JSON.parse(message);

  const params = {
    Destination: {
      ToAddresses: [`${data.email}`],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<html>
              <body>
                <h1>Hey ${data.fullName}</h1>
                <p>Thanks for registering!</p>
              </body>
            </html>`,
        },
        Text: {
          Charset: "UTF-8",
          Data: `Hey ${data.fullName} Thanks for registering!`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: `Hey ${data.fullName} 👋`,
      },
    },
    Source: `${SENDER_EMAIL}`,
  };

  ses
    .sendEmail(params)
    .promise()
    .then((data) => console.log("Message ID: ", data.MessageId))
    .catch((err) => console.error(err, err.stack));
};
