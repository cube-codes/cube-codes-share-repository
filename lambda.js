const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const BUCKET = 'cube-codes-share-repository';
const BASE_URL = 'https://share-repository.cube.codes/v1/appStates/';

exports.handler = async (event, context) => {

	//console.log('Received event: ', JSON.stringify(event, null, 2));

	let responseStatusCode = 200;
	const responseHeaders = {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*'
	};
	let responseBody;

	try {

		const putResult = await S3.putObject({
			Bucket: BUCKET,
			Key: `${context.awsRequestId}.json`,
			Body: event.body,
			ContentType: 'application/json'
		}).promise();

		responseBody = { url: `${BASE_URL}${context.awsRequestId}` };

	} catch (err) {
		responseStatusCode = 400;
		responseBody = { message: err.message };
	}
	
	const response = {
		statusCode: responseStatusCode,
		headers: responseHeaders,
		body: JSON.stringify(responseBody)
	};
	//console.log("Response: ", JSON.stringify(response, null, 2));
	return response;

};