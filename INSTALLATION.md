Everything in region: eu-central-1

# Create ACM Certificate

* Domain: share-repository.cube.codes
* Add Verfication CNAME in united-domains
* Verify Certificate

# Create S3 Bucket

* Name: cube-codes-share-repository
* Region: eu-central-1
* Enable Static Website Hosting with index.html

# Create Role

* Trusted Entity: Lambda
* Name: cube-codes-share-repository-api
* Description: Role to execute api calls on the cube-codes share repository
* Edit trust relationship
```
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Principal": {
				"Service": "lambda.amazonaws.com"
			},
			"Action": "sts:AssumeRole"
		},
		{
			"Effect": "Allow",
			"Principal": {
				"Service": "apigateway.amazonaws.com"
			},
			"Action": "sts:AssumeRole"
		}
	]
}
```
* Add Inline Policy named "policy"
```
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Action": [
				"s3:PutObject",
				"s3:GetObject"
			],
			"Resource": "arn:aws:s3:::cube-codes-share-repository/*"
		}
	]
}
```

# Create Lambda Function

* Name: cube-codes-share-repository-uploader
* Runtime: Node.js 14.x
* Change default execution role and use an existing role: cube-codes-share-repository-uploader
* Paste lambda.js
* Deploy

# Create API Gateway API

* Type: REST API
* Paste openapi.yaml
* Endpoint Type: Regional

## POST method

### Setup
* Integration Type: Lambda Function
* Use Lambda Proxy integration
* Function Name: cube-codes-share-repository-uploader

### Method Request

* Edit Request Validator: Validate body, query string parameters, and headers

## GET method

### Setup
* Integration Type: AWS Service
* AWS Region: eu-central-1
* AWS Service: Simple Storage Service (S3)
* AWS Subdomain: cube-codes-share-repository
* HTTP method: GET
* Action Type: Use path override
* Path override: {filename}.json
* Execution Role: arn:aws:iam::760841358818:role/cube-codes-share-repository-api

### Method Request

* Edit Request Validator: Validate body, query string parameters, and headers

### Integration Request

* URL Path Parameters -> Add path
  * filename
  * method.request.path.id

### Integration Response

* Add integration response
  * HTTP status regex: 4\d{2}
  * Method response status: 400

## Deploy

* Deployment stage: [New Stage]
* Stage name: v1
* Change Default Method Throttling
  * Enable throttling
  * Rate: 100
  * Burts: 100

## Create custom domain
	
* share-repository.cube.codes
* Choose Certificate
* Add API mapping
  * API: THIS
  * Stage: v1
  * Path: v1
* Set in united-domains a CNAME "share-repository.cube.codes" to "{CODE}.execute-api.eu-central-1.amazonaws.com" (CODE is found at the custom domain in the AWS console)
