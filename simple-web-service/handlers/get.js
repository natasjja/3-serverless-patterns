"use strict";

const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
  const params = {
    TableName: process.env.USER_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  dynamoDb
    .get(params)
    .promise()
    .then((data) => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(data.Item),
      });
    })
    .catch((err) => console.error(err, err.stack));
};
