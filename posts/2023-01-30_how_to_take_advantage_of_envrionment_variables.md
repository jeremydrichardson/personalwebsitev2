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

## chatgpt

Using environment variables in your continuous integration (CI) pipeline is a great way to keep sensitive information secure and to ensure that your pipeline is flexible and easy to maintain.

Here are a few ways you can use environment variables in your CI pipeline:

1. Storing credentials: You can use environment variables to store sensitive information such as API keys and database credentials. This way, you can keep this information separate from your code and only accessible to the build process, making it more secure.
2. Setting environment-specific configurations: You can use environment variables to configure different settings depending on the environment. For example, you can use different database connections or API endpoints for your development and production environments.
3. Managing secrets: Many CI/CD tools, such as Jenkins, GitHub Actions, and CircleCI, have built-in support for secrets management, which allow you to store, manage, and encrypt your environment variables.
4. Injecting variables: These tools also provide a way to inject environment variables into your pipeline, this way you don't need to hardcode them into your code and you can easily change them without modifying the codebase.
5. Testing and deployment: You can use environment variables to control the behavior of your tests and deployments. For example, you could use an environment variable to control whether your tests run on a specific browser or whether your deployment runs on a specific environment.

By using environment variables in your CI pipeline, you can keep sensitive information secure, make your pipeline more flexible, and make it easier to manage and maintain. It also allows you to have a more efficient and smooth deployment process, as you don't have to worry about hardcoding sensitive information into your code.

When it comes to writing code that will be deployed to multiple environments, such as development, staging, and production, it can be difficult to keep track of all the different configuration settings that need to be changed depending on the environment. One way to make this process easier is to use environment variables.

An environment variable is a value that is set outside of the code and can be accessed by the code at runtime. This allows you to separate the configuration settings from the code itself, making it much easier to make changes without having to modify the code.

For example, let's say that you have a piece of code that connects to a database. In the development environment, the code needs to connect to a local database, but in the production environment, it needs to connect to a remote database. Instead of using an if statement to check the environment and then setting the connection string accordingly, you can use an environment variable to store the connection string. The code can then access the environment variable at runtime and use the appropriate connection string for the current environment.

Another benefit of using environment variables is that it makes it easier to share the code between different team members and across different environments. Since the configuration settings are not hard-coded into the code, it's much less likely that someone will accidentally commit sensitive information, such as a password, to the code repository.

There are several libraries available that can help you manage environment variables in your code. For example, the "dotenv" library in Node.js makes it easy to load environment variables from a file, while the "os" module in Python provides built-in support for environment variables.

In conclusion, using environment variables is a great way to keep your code clean and make it easy to deploy to different environments. It also helps in preventing sensitive information from being exposed in the codebase and makes it easier to share the code with others.
