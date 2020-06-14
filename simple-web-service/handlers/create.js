"use strict";

const uuid = require("uuid");
const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.USER_TABLE,
    Item: {
      id: uuid.v1(),
      name: data.name,
      surname: data.surname,
    },
  };

  dynamoDb
    .put(params)
    .promise()
    .then(() => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(params.Item),
      });
    })
    .catch((err) => console.error(err, err.stack));
};
