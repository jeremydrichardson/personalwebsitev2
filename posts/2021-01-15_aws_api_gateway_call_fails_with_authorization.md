---
title: AWS API Gateway call fails with authorization
date: 2021/01/15
last_updated:
description: CORS issues can be some of the worst to debug. Often the error you see doesn't give any information as to the cause.
tag: API Gateway, AWS, AWS SAM, CORS
author: You
published: true
---

# AWS API Gateway call fails with authorization

Tags: API Gateway, AWS, AWS SAM, CORS

CORS issues can be some of the worst to debug. Often the error you see doesn't give any information as to the cause.

When building an API with AWS API Gateway you will often need to authenticate the user before they can access that API.

Using a SAM template this is easy by adding the an Auth section to your template.yaml file.

```yaml
SAMOAPAPIApi:
  Type: AWS::Serverless::Api
  Properties:
    StageName: Prod
    Cors:
      AllowMethods: "'*'"
      AllowHeaders: "'*'"
      AllowOrigin: "'*'"
    Auth:
      AddDefaultAuthorizerToCorsPreflight: false
      DefaultAuthorizer: OAPAPIAuthorizer
      Authorizers:
        OAPAPIAuthorizer:
          UserPoolArn: [some user pool arn...]
```

However, when you add an authorizer and set the DefaultAuthorizer attribute, you will find that it will add authentication to every method of every endpoint. This includes the OPTIONS method that is used as preflight for verifying CORS access. This preflight call is an automated call by the browser that will not have any authentication information associated with it, therefore failing any CORS tests and disallowing you from access the resource.

There are 2 ways to overcome this:

- Use the AddDefaultAuthorizerToCorsPreflight attribute to your template.yaml file and set it to false. This will be the best option in most cases.
- Don't use the DefaultAuthorizer attribute and instead apply the authorizer to only those endpoints that you wish to be protected.
