![AWS Serverless Community Day](https://drive.google.com/uc?export=view&id=171xqIun5zu2WhOg9dw_hxvACHHwNbE7t)

---

### **Getting started with Serverless - 3 Easy Patterns**

There's a project directory for each pattern:

#### Simple Web Service

- Once deployed, copy the `GET` and `POST` methods to an API client like Postman.

#### Data Processing

- Once deployed, go to S3 in the AWS console and upload an image to the `upload-image-bucket`

- Check the `resized-image-bucket` for the processed and resized image.

#### Fan-Out

- Create a `.env` file for this service and add an email for the sender's email address, set to `SENDER_EMAIL_ADDRESS`.

- You'll then need to go to SES in the AWS console and verify the address you're sending the email **from** and **to** due to the sandbox restrictions.

- Deploy the service

&nbsp;

### **Deploying a service**

- Sign in to AWS via [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html)

- `cd` into a service

- Run `npm install`

- Run `sls deploy` to deploy the service

- Watch your stack come to life in the AWS console! 🎉

&nbsp;

Each service was created with a Serverless Framework template.

Run `serverless create --template aws-nodejs` in a new direcrtory to create your own service!

### Video

The video for the talk can now be viewed here:

<iframe width="560" height="315" src="https://www.youtube.com/embed/-qFiTczX_tI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
