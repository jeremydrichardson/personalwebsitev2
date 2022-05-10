---
title: npm - install, update, or upgrade?
createDate: "2022-05-10"
description: I’ve been a user of npm for a long time and even still when it comes time to look at my dependencies, I’m always confused as the the *official* method to update dependencies.
tag: Node, npm
author: You
published: true
---

I’ve been a user of npm for a long time and even still when it comes time to look at my dependencies, I’m always confused as the the _official_ method to update dependencies.

## npm install _library-name_

### Install

This is the easiest and most obvious. When you run npm install it will install the latest release version of the plugin (excluding pre-release versions).

```bash
npm install my-required-library
```

Easy peasy.

## npm install

### Update

When you first clone a repo, you must do an `npm install` in order to grab the dependencies listed in package.json. The trick is it will automatically upgrade to the latest version of the dependency given the version rule.

For example, if we set the version in our library to `~1.2.0` and the latest version of the library is `1.2.6`, you will get 1.2.6. Or if your version in package.json is set to ^1.2.0 and the latest version is 1.3.2, you will be upgraded to 1.3.2.

NOTE: It doesn’t matter what is in your package-lock.json file, it will still update these libraries and also update the package-lock.json file.

Any time you run `npm install` it will attempt to find the latest version that your package.json version rules allow.

## npm install _library-name@version-number_

### Upgrade

If you want to upgrade a library beyond the version rule setup in your package.json, there are two ways. The first is to manually update the dependency version rule and run `npm install`.

The prefer the second way, which feels more like an intentional upgrade.

```bash
npm install library-name@version-number

# example if version rule was currently ~1.2.0
npm install library-name@2
```

If you omit one or more points in the version, npm will assume you want to latest. If the latest version 2 was 2.1.5, that is what you would get.

## Conclusion

This is not an exhaustive description of npm version management, but it should give newcomers a better reference to the install, update, upgrade process that I wish I had known a lot sooner.
