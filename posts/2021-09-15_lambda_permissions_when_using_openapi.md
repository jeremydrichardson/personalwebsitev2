---
title: Lambda Permissions When Using an OpenAPI definition with AWS SAM
date: 2021/09/15
description: Ran into an issue today where when using an OpenAPI definition for the API in my AWS SAM template, the endpoints were not working. The common "Internal Server Error" didn't give anything to go off of.
tag: API Gateway, AWS, AWS SAM, OpenAPI
author: You
---

# Lambda Permissions When Using an OpenAPI definition with AWS SAM

Tags: API Gateway, AWS, AWS SAM, OpenAPI

## The Issue

Ran into an issue today where when using an OpenAPI definition for the API in my AWS SAM template, the endpoints were not working. The common "Internal Server Error" didn't give anything to go off of.

## AWS Console - Test the Endpoint

In order to find the details of the error, I logged into the AWS API Gateway console, went to the get method on the endpoint I wanted to test, and click the test button. I ran the test with the default options and was able to see the returned output.

This is where I found the error "Execution failed due to configuration error: Invalid permissions on Lambda function." Since their are no real options for permissions in a SAM template, I was confused as to why I was getting this error.

## Defining the Problem

Apparently when defining endpoints through the AWS SAM Lambda definition, AWS SAM will implicitly create the correct permissions on the Lambda function. However, when defining the endpoints entirely with and OpenAPI definition using the DefinitionBody property of the API resource in the AWS template file, those permissions don't get set. Hence the permissions error.

I found a couple resources that helped with the issue including this GitHub issue - [https://github.com/aws/serverless-application-model/issues/148](https://github.com/aws/serverless-application-model/issues/148).

```yaml
GraphQLPerms:
  Type: AWS::Lambda::Permission
  DependsOn:
    - NameOfApiGatewayResource
    - NameOfLambdaFunctionResource
  Properties:
    Action: lambda:InvokeFunction
    FunctionName: !Ref NameOfLambdaFunctionResource
    Principal: apigateway.amazonaws.com
```

Keep in mind this is not SAM specific, but AWS SAM templates can use native CloudFormation code as well.
