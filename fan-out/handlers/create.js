"use strict";

const uuid = require("uuid");
const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const sns = new AWS.SNS();

const { TOPIC_ARN } = process.env;

module.exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body);

  const tableParams = {
    TableName: process.env.USER_TABLE,
    Item: {
      id: uuid.v1(),
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
    },
  };

  try {
    const dynamoDbPromise = dynamoDb.put(tableParams).promise();

    dynamoDbPromise
      .then(() => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(tableParams.Item),
        });
      })
      .catch((err) => console.error(err, err.stack));

    const topicParams = {
      Message: JSON.stringify(tableParams.Item),
      TopicArn: TOPIC_ARN,
    };

    sns
      .publish(topicParams)
      .promise()
      .then((data) => console.log("MessageID is ", data.MessageId))
      .catch((err) => console.error(err, err.stack));
  } catch (e) {
    console.log("Error: ", e);
  }
};
