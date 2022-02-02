---
title: AWS API Gateway decodes url query string
createDate: "2022-02-02"
description: For some reason when using a VPC Link with *Use Proxy Integration* enabled, API Gateway will decode the url string before sending it on to the integration server. That means when our node server received the request it would include invalid characters like spaces.
tag: AWS, AWS API Gateway, Node, ExpressJS
author: You
published: true
---

We ran into on odd problem that was hard to track down due to it’s odd nature.

For some reason when using a VPC Link with *Use Proxy Integration* enabled, API Gateway will decode the url string before sending it on to the integration server. That means when our node server received the request it would include invalid characters like spaces.

## Custom Middleware

Essentially we ended up having to write our own middleware that would re-encode the query string before it was being evaluated for action.

```jsx
function queryStringReEncode(req, res, next) {
  if (req.originalUrl.match(/\?/)) {
    const queryString = Object.keys(req.query)
      .map((key) => {
        // take into account when the query contains an array object (getMany)
        if (Array.isArray(req.query[key])) {
          const stringfiedArray = req.query[key].join(`${key}=`);
          return stringfiedArray;
        }
        return encodeURI(`${key}=${req.query[key]}`);
      })
      .join("&");
    const reEncodedUrl = req.originalUrl.split("?")[0] + `?${queryString}`;
    req.originalUrl = reEncodedUrl;
  }
  console.log(`${req.method} from: ${req.originalUrl}`);
  next();
}
```

## AWS API Gateway solution

I’ve continued to search for a solution to this but apparently it is functioning the way it should. I’ll have to add more data at a later date when I have to delve into it again. Been a while since I touched the code and did the testing.