---
title: node version management on AWS CI build images
date: 2021/3/18
description: Amplify default image (Amazon Linux 2 - think it's a custom Amplify docker image, can find in a repo) has nvm installed by default to manage node versions.
tag: AWS, Amplify, CodeBuild, DevOPS, Node
author: You
published: false
---

# node version management on AWS CI build images

Tags: AWS, Amplify, CodeBuild, DevOPS, Node

So frustrating

Amplify default image (Amazon Linux 2 - think it's a custom Amplify docker image, can find in a repo) has nvm installed by default to manage node versions.

CodeBuild we use image aws/codebuild/standard:5.0. This has n, an npm module, installed to help with managing node versions.

Took a lot of troubleshooting to be able to pick which version of node to run. Would be much nicer if this was documented. AWS does document how to run different versions of node, but the versions they offer are very limited (Amazon Linux 2 only has node 12).

In the end was able to use the appropriate command to install the correct version of node and then it would work.

n 16 (n)

nvm install 16 (nvm)
