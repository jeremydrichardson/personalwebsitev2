---
title: You need to be using conventional commits
createDate: "2023-02-06"
description: Commit messages can be used for so much more than just "fixed bug". They can be used to communicate a range of data for both humans and machines if those messages can follow a system. Conventional commits is that system.
tag: Git
author: You
published: true
---

## Why?

Before we get into _what is conventional commits_, I thought it made more sense to talk about why you need it.

Determining what changes have happened to your project is not a trivial task. What version should this release be? What features are included? What does it matter?!

Instead of spending valuable brain cycles on figuring out the answers to these questions, conventional commits comes on the scene to solve with your current workflow.

## What is/are conventional commits?

Conventional commits is a lightweight and simple convention for structuring commit messages. It provides an easy way to communicate the purpose of a commit to both humans and machines. It will make your development life better.

For example:

```jsx
feat(<Button>): add render as anchor tag capability
JIRA-843
```

`feat` denotes a commit that contributes to a new feature. This type of commit will increase your project’s version number by 0.1.0 (eg. 5.11.3 will go to 5.12.0).

Or a simple bug fix might be:

```jsx
fix: spelling mistake
```

`fix` will take your project up just a 0.0.1 (eg. 8.4.6 will go to 8.4.7).

## Automate away the boring stuff

Using conventional commits allows us to automate certain tasks. Semantic release is an amazing tool for taking the emotional component out of deciding version numbers. By describing your commits in a uniform manner, your version numbers are generated for you based on a simple set of criteria.

Conventional commits also makes it easier to create changelogs, a list of all the changes that have been made to your codebase. Even internal-only changelogs are important to give basic documentation on what work was actually done. Link your commit messages to Jira issues (or whatever painful issue tracker you subscribe to) and the business will know what work is done.

## You need to be using conventional commits

If nothing else, it helps save you from a world of commit messages that lack heart like `fix` or `uh oh...`.

Conventional commits is a simple and lightweight convention for structuring commit messages that will greatly improve your workflow. It makes it easy to understand the history of your codebase, automate certain tasks, and create changelogs. You need to be using conventional commits in your projects.
