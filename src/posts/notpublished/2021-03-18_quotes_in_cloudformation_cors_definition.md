---
title: Quotes in CloudFormation CORS definition
date: 2021/3/18
description: I recently began using cfn-include in order to split my YAML files up into more manageable chunks. An unintended side-effect is that cfn-include reformats my entire AWS SAM template (which is a subset of Cloudformation). The syntax for quoting the CORS statements confused me.
tag: AWS, CloudFormation, CORS
author: You
published: false
---

# Quotes in CloudFormation CORS definition

I recently began using cfn-include in order to split my YAML files up into more manageable chunks. An unintended side-effect is that cfn-include reformats my entire AWS SAM template (which is a subset of Cloudformation). The syntax for quoting the CORS statements confused me.

I started out with the following:

```yaml
Cors:
  AllowMethods: "'*'"
  AllowHeaders: "'*'"
  AllowOrigin: "'*'"
```

Then after processing with cfn-include I would get:

```yaml
Cors:
  AllowHeaders: "'*'"
  AllowMethods: "'*'"
  AllowOrigin: "'*'"
```

I'm still not sure of the correct quote syntax. Does triple quotes mean something or is it a combination of two single quotes and then a single singe quote?
