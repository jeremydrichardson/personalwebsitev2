---
title: Scripting CloudFormation deployments
createDate: "2022-03-02"
description: Using the AWS console to deploy can get tedious when you’re working through issues with the deployment. I’d love to say I can write perfect CloudFormation templates every time but that’s just not true. And the only way to truly validate your code is to attempt to deploy it (hopefully in some kind of staging area!).
tag: AWS, CloudFormation, Node, AWS CLI, Javascript
author: You
published: true
---

We try to use CloudFormation whenever we are building AWS infrastructure because of two main factors:

1. Repeatability
2. Code history with Git

Using the AWS console to deploy can get tedious when you’re working through issues with the deployment. I’d love to say I can write perfect CloudFormation templates every time but that’s just not true. And the only way to truly validate your code is to attempt to deploy it (hopefully in some kind of staging area!).

## AWS CLI

That’s where the AWS CLI comes in. From the command line on my own machine I can deploy CloudFormation templates and have a quicker feedback loop.

But even the AWS CLI is limited in what it can do. I mean, I suppose I could write complex bash scripts to bend it to my will, but my bash skills are beginner at best.

## AWS Javascript SDK

My Javascript skills, however, are much more developed. This is where the AWS Javascript SDK comes in to play. Now we’re able to deploy CloudFormation and use Javascript logic to deal with the inputs and outputs.

### CMake

For whatever reason I didn’t have CMake on my new Mac Mini. I don’t remember installing it on my old laptop but alas, I guess I just need it. I try to use Homebrew for these kinds of needs.

```jsx
brew install cmake
```

### Configure AWS User

You will still need the AWS CLI in order to save your user information so that you don’t have to add it to every script.

```jsx
aws configure
```

This will ask you for your secret information from the IAM user that has the ability to deploy CloudFormation and any other necessary privileges.

### Upload Templates

In order to deploy CloudFormation templates we must first upload them to an S3 bucket. I usually make this it’s own script so I can include it in however many other scripts need it.

We need a couple pieces of information for this:

1. S3 Bucket name
2. Path to folder with templates

We end up with the following:

```jsx
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const path = require("path");
const fs = require("fs");

const bucket = "cf-templates-s3";

const pathToFiles = path.resolve(__dirname + "/pathToTemplates");
const files = fs.readdirSync(pathToFiles);

const s3Client = new S3Client();

files.forEach(async (filename) => {
  try {
    const data = await s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: path.basename(filename),
        Body: fs.createReadStream(`${pathToFiles}/${filename}`),
      })
    );
    console.log("Success", data);
  } catch (err) {
    console.log("Error", err);
  } finally {
    console.log("Upload script finished");
  }
});
```

Now we create a script in our package JSON so we can run it from the command line easily and add to other scripts.

```jsx
"scripts": {
    "upload-templates": "node ./scripts/uploadTemplates.js"
}
```

### Deploy CloudFormation file

So far I have created a separate Javascript file for each CloudFormation file I upload. This is due to the nature of our system. However, there wouldn’t be anything from stopping one from passing the name of the template as a parameter and deploying that way.

We need the following information:

1. What we want to call our changeset
2. The stack name we’re updating (this is process is only for updating, we still create our stacks through the AWS console)
3. Path to the CloudFormation template file in our S3 bucket

### Create Changeset

We always use changesets. It seems a bit like Russian-roulette to deploy without first confirming what is going to change.

```jsx
const createChangeSet = await cf.send(
  new CreateChangeSetCommand({
    Capabilities: ["CAPABILITY_NAMED_IAM"],
    ChangeSetName: changeSetName,
    StackName: stackName,
    TemplateURL: `https://s3.amazonaws.com/${bucket}/cfTemplate.yaml`,
    Parameters: [
      { ParameterKey: "parameter1", UsePreviousValue: true },
      { ParameterKey: "parameter2", UsePreviousValue: true },
    ],
  })
);
```

**Capabilities**

This is only necessary if we are doing things like adding IAM roles. Normally you would have to check a box if doing it through the console. Here we can add the capabilities we need which is just another confirmation that we know the contents of this CloudFormation file and we known what we’re doing.

**Parameters**

Since we’re just updating our stack, we want to preserve all the parameter values we entered when we created the stack. We need to add a line for each parameter.

### Wait for Changeset to Complete

Since the creation of the changeset is an asynchronous command, if we want to wait for the result, we need to use the `waitUntilChangeSetCreateComplete` function.

```jsx
try {
  const done = await waitUntilChangeSetCreateComplete(
    { client: cf, minDelay: 5, maxDelay: 10 },
    { ChangeSetName: changeSetName, StackName: stackName }
  );
  console.log("done", done);
} catch (err) {
  console.log("There was an error creating the change set.", err);
}
```

Once it’s complete, we use `DescribeChangeSetCommand` to find out if it completed successfully or not. If it returns anything other than `CREATE_COMPLETE`, we exit our script with an error message.

```jsx
const describeChangeSet = await cf.send(
  new DescribeChangeSetCommand({
    ChangeSetName: changeSetName,
    StackName: stackName,
  })
);

if (describeChangeSet.Status !== "CREATE_COMPLETE") {
  console.log(describeChangeSet.StatusReason);
  return false;
}
```

Then we print out the results of the changeset to the console and ask the user if they want to execute the changeset.

```jsx
const ok = await yesno({
  question: "Do you want to execute this changeset? [y/n] ",
});

if (!ok) return false;
```

### Executing Changeset

```jsx
const execute = await cf.send(
  new ExecuteChangeSetCommand({
    ChangeSetName: changeSetName,
    StackName: stackName,
  })
);
```

Similar to how we had to check if the creation of the changeset was complete, we need to check if the stack update has completed with `waitUntilStackUpdateComplete`.

```jsx
const updateDone = await waitUntilStackUpdateComplete(
  { client: cf, minDelay: 5, maxDelay: 10 },
  { StackName: stackName }
);
console.log("update done", updateDone);

// If there was an error, don't go any further
if (updateDone.state !== "SUCCESS") {
  console.log("There was an error implementing the changestack.");
  return false;
}
```

### Update Package.json

Now we can add another script to our package JSON that will first upload the templates and then deploy the CloudFormation template

```jsx
"scripts": {
    "upload-templates": "node ./scripts/uploadTemplates.js",
    "update-cf": "npm run upload-templates && node ./scripts/update-cf.js"
  }
```

Now we can run `npm run update-cf` and start the feedback loop to speed up the debug process.
