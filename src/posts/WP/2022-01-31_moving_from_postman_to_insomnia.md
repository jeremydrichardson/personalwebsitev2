---
title: Moving from Postman to Insomnia
createDate: "2022-01-31"
description: Postman has been great and served many purposes over the last couple years of development. However, I heard about Insomnia just as I was going into another phase of needing to test HTTP requests again. I thought I would try it out.
tag: Insomnia, Postman, Rest, OpenAPI
author: You
published: true
---

Postman has been great and served many purposes over the last couple years of development. However, I heard about Insomnia just as I was going into another phase of needing to test HTTP requests again. I thought I would try it out.

## Interface

The interface is a lot cleaner than Postman. I found it simple to find what I need and the straightforward layout allowed me to get right into testing.

The more advanced functionality while initially hidden was not hard to find. It was mostly intuitive to find or a quick search on Google got me the rest of the way.

## Collection vs Document

I was able to quickly create a new resource collection by importing our OpenAPI doc. I tried both as a document and as a collection. I can see the potential advantage of the document, immediately it highlighted a couple errors that had crept into our OpenAPI definition. But for now I think the collection will work fine for my purposes.

## Environment

The environment is a clever way of being able to add advanced functionality, simply. You end up building a custom JSON object that acts as your environment. You can reference this data from many different locations adding versatility and adaptability to the product.

## Plugins

**[Global Headers](https://insomnia.rest/plugins/insomnia-plugin-global-headers)**

This plugin will allow us to apply headers to every request without having to manually modify every request. This is great for our situation where I haven’t yet figured out how to have Insomnia get the auth token from Cognito automatically. This way I can just grab the token from our front end app and plug it into the environment variables so it will apply the header to every endpoint.

```json
{
	"scheme": [
		"http"
	],
	"base_path": "/v1",
	"host": "localhost:3001",
	"GLOBAL_HEADERS": {
		"Authorization": "Bearer <token>"
	}
}
```