---
title: True and false for CloudFormation parameters
createDate: "2022-03-14"
description: CloudFormation doesn’t offer an official boolean type when dealing with parameters, but I’ve found that the coercion of values works pretty well. Using this method helps to avoid a lot of unnecessary if statements in our templates.
tag: AWS, CloudFormation
author: You
published: true
---

CloudFormation doesn’t offer an official boolean type when dealing with parameters, but I’ve found that the coercion of values works pretty well. Using this method helps to avoid a lot of unnecessary if statements in our templates.

## True / False parameters

Although there are no true boolean parameters types, there are boolean properties that exist in CloudFormation. If we wanted to parameterize any of these properties we either have to use and if statement, or we can allow CloudFormation to coerce the value from a string.

I don’t have a great example of this but would refer to an excellent blog post by [farski](https://github.com/farski) entitled “[Boolean Parameters in CloudFormation](https://www.awholenother.com/2020/06/20/boolean-parameters-in-cloudformation.html)” where he illustrates using the _ObjectLockEnabled_ property of an S3 bucket.

For my purposes, I’m going to show how this looks with conditions.

```yaml
Parameters:
  ExistingVPC:
    Description: Do you want to use an existing VPC?
    Type: String
    Default: false
    AllowedValues:
      - true
      - false

Conditions:
  IsExistingVPC: !Equals [!Ref ExistingVPC, true]
```

### It’s Still a String...

In the above example you need to remember that even though YAML interprets the booleans, CloudFormation will coerce them into strings. That is why we can’t do something like:

```yaml
Conditions:
  IsExistingVPC: !Ref ExistingVPC
```

CloudFormation will interpret this as a string and the condition will error out because it expects a true boolean. That is why we need the function !Equals to return a true boolean.

!Equals will coerce the boolean into a string, compare it with the parameter, which is also coerced to a string, and evaluate to the true boolean true for the condition.

### Benefits

The primary benefits to this method compared to straight strings:

- Properties - This is illustrated by the blog post mentioned above.
- YAML code highlighting - Don’t underestimate the value of code highlighting. Boolean values show different than strings and help with readability.
- Future proof - If CloudFormation ever does add boolean parameters values, you’ll already be taking advantage.
- Reduce code complexity - Don’t need so many if statements.
