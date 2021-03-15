* Everything in region: eu-central-1

# Enable Logging for API Gateway in general

* Create IAM Role
	* Use Case: API Gateway - Allows API Gateway to push logs to CloudWatch Logs
	* Name: AWSServiceRoleSendingAPIGatewayLogs
* Paste Role ARN into https://eu-central-1.console.aws.amazon.com/apigateway/home?region=eu-central-1#/settings

# Create Service

* Create Stack
* API Gateway -> deploy (also on every update)
* Create CNAME entry in DNS from DomainName to CloudFront Hostname