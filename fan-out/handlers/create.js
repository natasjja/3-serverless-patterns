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
    dynamoDb.put(tableParams, (error) => {
      if (error) {
        console.error(error);
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: { "Content-Type": "text/plain" },
          body: "Couldn't create the user.",
        });
        return;
      }

      const response = {
        statusCode: 200,
        body: JSON.stringify(tableParams.Item),
      };
      callback(null, response);
    });

    const topicParams = {
      Message: JSON.stringify(tableParams.Item),
      TopicArn: TOPIC_ARN,
    };

    sns.publish(topicParams, (error) => {
      if (error) {
        console.error(error);
        callback(null, {
          statusCode: 501,
          headers: { "Content-Type": "text/plain" },
          body: "Couldn't send message.",
        });
      }

      const response = {
        statusCode: 200,
        body: JSON.stringify({ message: "Successfully sent message" }),
      };
      callback(null, response);
    });
  } catch (e) {
    console.log("Error: ", e);
  }
};
