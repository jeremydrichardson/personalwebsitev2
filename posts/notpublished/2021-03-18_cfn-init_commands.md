---
title: cfn-init commands
date: 2021/3/18
description: Was super hard to determine what commands could run and the context of those commands from the AWS::CloudFormation::init section.
tag: AWS, CloudFormation, DevOPS
author: You
published: false
---

# cfn-init commands

Tags: AWS, CloudFormation, DevOPS

Was super hard to determine what commands could run and the context of those commands from the AWS::CloudFormation::init section.

- Seems to use /sh instead of /bash
- Couldn't run subcommands ${}
- Runs as root user, but with weird quirks (pm2 startup showed "undefined" as the user)
- Hard to debug as have to run the CloudFormation stack over and over

```jsx
3-Pm2Config:
	command: !Sub "sudo -u ec2-user pm2 start ecosystem.config.js --env ${Environment} && sudo -u ec2-user pm2 save"
	cwd: "/home/ec2-user"
4-Pm2Startup:
	command: sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ec2-user --hp /home/ec2-user
  cwd: "/home/ec2-user"
```
