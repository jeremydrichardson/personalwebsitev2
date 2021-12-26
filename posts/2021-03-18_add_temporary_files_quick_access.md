---
title: Add Temporary Files to Quick Access menu in AppStream
date: 2021/3/18
description: It's annoying for users to have to find the Temporary Files folder every time they need to transfer files in or out of AppStream 2.0. To make it slightly easier you can use this script to add any folder to the Quick Access menu in the startup session script.
tag: aws appstream
author: You
---

# Add Temporary Files to Quick Access menu in AppStream

It's annoying for users to have to find the Temporary Files folder every time they need to transfer files in or out of AppStream 2.0. To make it slightly easier you can use this script to add any folder to the Quick Access menu in the startup session script.

Problems with:

- Can't do in builder because the folder doesn't exist
- Can't do it from client as you don't have access to the root of the folder (not sure how this works...)

Do it programmatically with a PowerShell script - [https://stackoverflow.com/questions/30051634/is-it-possible-programmatically-add-folders-to-the-windows-10-quick-access-panel](https://stackoverflow.com/questions/30051634/is-it-possible-programmatically-add-folders-to-the-windows-10-quick-access-panel)
