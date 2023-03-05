---
title: Namespace for multi-stack CloudFormation Deployments
createDate: "2022-03-14"
description: Naming on the best of days in any programming language can be one of the hardest things to do and increase technical debt by leaps and bounds. CloudFormation and AWS take naming to a new level with so many different layers of naming and potential naming collisions.
tag: AWS, CloudFormation
author: You
published: true
---

Naming on the best of days in any programming language can be one of the hardest things to do and increase technical debt by leaps and bounds. CloudFormation and AWS take naming to a new level with so many different layers of naming and potential naming collisions.

This is our approach to this issue.

## Namespace

A namespace is simply a way to identify based on the name of the resource, property, or whatever else requires a name.

We do this with 2 elements:

- App prefix - This is an abbreviated app identifier.
- Environment prefix - Defines the environment we are deploying.

With the combination of these two naming elements we can differentiate each deployment.

## App Prefix

We use a 4 letter uppercase abbreviation of our app. This is hardcoded into the CloudFormation templates before each variable name.

We haven’t done this for logical names since they are local to the template. We may need to do this at some point but currently this is not necessary and I can’t think of a good reason we need would need to.

For our example we’ll use the prefix: `MYAPP`

## Environment Suffix

This begins with a parameter:

```yaml
Parameters:
  Environment:
    Description: What is the environment is this deployment? This will be appended to all resources to identify their environment.
    Type: String
    Default: stg
    AllowedValues:
      - dev
      - stg
      - prd
```

I have debated whether we should add the environment as a prefix as well but haven’t decided it was better yet.

Now we have access to that parameter that can be appended to any name we need.

```yaml
Resources:
  MyVPC:
    Type: "AWS::EC2::VPC"
    Properties:
      CidrBlock: !Ref VpcCidrBlock
      Tags:
        - Key: Name
          Value: !Sub MYAPP-VPC-${Environment}
```

Now we can deploy our app multiple times in the same account without naming collision. We would end up with the following VPCs based on the above example:

- MYAPP-VPC-dev
- MYAPP-VPC-stg
- MYAPP-VPC-prd

## Multiple Template Deployments

Our specific application is broken into multiple CloudFormation templates for a number of reasons. With this naming methodology, we only need to duplicate the environment parameter for each template.

By setting the environment we automatically are matching up the different resources. We can import values from the right deployment because we have specified the environment.
