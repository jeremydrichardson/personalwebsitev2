---
title: How to take advantage of Envrionment Variables
createDate: "2023-01-30"
description: When developing a project it is often common to hard code values just to get things working. The context shift of setting up environment variables is enough to put it off until a later moment. We then end up with if-hell that is not relevant to what our code is supposed to be doing.
tag: DevOps
author: You
published: true
---

Our projects have at least 3 different environments:

- Development
- QA
- Production

When developing a project it is often common to hard code values just to get things working. The context shift of setting up environment variables is enough to put it off until a later moment.

Then we need to push it up to QA for someone to take a look at and we need a new value for this variable. Again, instead of setting up environment variables, for a slew of reasons including that we probably don’t have access to the deployment environment to create those variables, so we need to put a request in that will take time.

Instead we add an if statement:

```jsx
let importantVariable = "dev value"
if (some way of determining QA environments...) {
	importantVariable = "QA value"
}
```

And then we’re up against a deadline so we need to get it to production and end up doing:

```jsx
let importantVariable = "dev value"
if (some way of determining QA environments...) {
	importantVariable = "QA value"
}
if (some way of determining prod environment...) {
  importantVariable = "Prod value"
}
```

## The enemy of clarity

We always want our code to be easy to read an understand. This is especially important when working on a team but also promotes writing better code.

We don’t want environment specific code in our repo. This muddies things up and makes our code less concise and harder to debug. Why have a string of if statements when we can easily swap out this value with an environment variable?

## Environment variables make your code simpler

With environment variables setup, you code can now focus on what it is doing instead of where it is running. This reduces the friction of trying to determine the environment in code and instead delegating this to the environment itself.
