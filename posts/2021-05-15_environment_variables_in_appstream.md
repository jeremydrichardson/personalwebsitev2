---
title: Environment Variables in AppStream start and end scripts
date: 2021/05/15
description: AppStream 2.0 provides the ability to run scripts before and after a user session. This allows us to do various preparation steps based on custom information for that user.
tag: AWS, AWS AppStream 2.0, Environment Variables
author: You
---

# Environment Variables in AppStream start and end scripts

Tags: AWS, AWS AppStream 2.0, Environment Variables

AppStream 2.0 provides the ability to run scripts before and after a user session. This allows us to do various preparation steps based on custom information for that user.

Environment variables provide a method to pass custom data from the client through the browser to the AppStream 2.0 instance. These are called Session scripts ([https://docs.aws.amazon.com/appstream2/latest/developerguide/use-session-scripts.html](https://docs.aws.amazon.com/appstream2/latest/developerguide/use-session-scripts.html)). There are only a couple ways to do this and they all end up as environment variables:

- SessionContext as part of building the URL with CreateStreamingURL -

[Fleets and Stacks](https://docs.aws.amazon.com/appstream2/latest/developerguide/managing-stacks-fleets.html#managing-stacks-fleets-parameters)

- Use information that is provided automatically in the AppStream 2.0 instance

The trick is that many of the environment variables that you would wnat to access like the username, streaming context and others are not available for scripts. This is due to a Windows oddity that even though the environment variables have been added, some kind of restart is required, either the entire operating systems or other hacks like just restarting explorer.exe.

We know that the environment variables are there though, so we just need an alternate way of accessing them. We can do this by access them through the registry directly.

The easiest way to do this is using a few PowerShell commands.
