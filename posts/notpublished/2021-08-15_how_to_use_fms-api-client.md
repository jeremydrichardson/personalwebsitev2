---
title: How to use fms-api-client with Lambda
date: 2021/08/15
description: Specifically with the lifecycle of the session. Need destroy the client before the lambda returns otherwise it will leave open connections and create a new one each time.
tag: AWS Lambda, fms-api-client
author: You
published: false
---

# How to use fms-api-client with Lambda

Specifically with the lifecycle of the session. Need destroy the client before the lambda returns otherwise it will leave open connections and create a new one each time.
