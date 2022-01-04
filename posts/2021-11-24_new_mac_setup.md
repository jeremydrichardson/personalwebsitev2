---
title: New Mac setup after hard drive upgrade
createDate: "2021-11-21"
description: Recently purchased a new Mac and wanted to document the setup process so next time I have a map and don't have to think up the entire process again.
tag: Macbook Pro, macOS, Mac Mini
author: You
published: true
---

# Disable swipe between pages

This seemingly helpful feature ends up being super annoying as I find myself unintentionally moving to previous or next pages when browsing the web in any browser. Disabling this brings back sanity.

System Preferences > Trackpad > More Gestures > uncheck "Swipe between pages"

# Command Line Apps to Install

### XCode command line tools

If you try to run a command that requires it, macOS will ask if you want to install them. Try to install nvm or HomeBrew and it will prompt you.

### HomeBrew

I try to use HomeBrew when possible as it makes updating in the future a lot easier.

### AWS SAM

[https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install-mac.html](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install-mac.html)

Don't use SAM at the moment so no need to install.

### AWS CLI

[https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-mac.html](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-mac.html)

Used for running CloudFormation update scripts. Haven't used for much else other than a couple scripts that perform global tasks on AWS (like deleting all default VPCs in all regions).

### Node.js

Use nvm to install so you can manage different versions easily.

### Git

I keep going back and forth between using Apple default git that comes with XCode command line tools and git from HomeBrew. Latest install just using Apple git.

### nvm

This is to install node easily, as well as give the option to run multiple versions if I need to.

NOTE: make sure ~/.zshrc file exists before installing. Default macOS install doesn't automatically create this file. Just do

```bash
touch ~/.zshrc
```

### oh my zsh!

I don't totally know why I install this but a lot of people seem to really like it. I might try not using it for a while so that I appreciate what it gives me when I install it.

- Well, installing Wes Bos' Cobalt2 theme for zsh is the reason to use it

### ssh

I normally follow the Bitbucket instructions for setting up an SSH key ([https://support.atlassian.com/bitbucket-cloud/docs/set-up-an-ssh-key/](https://support.atlassian.com/bitbucket-cloud/docs/set-up-an-ssh-key/)). I noticed this last time with macOS Monterey that the -K command of ssh-add no longer works and my password was not saving for the ssh key. Turns out they changed the flag and it's now:

```bash
ssh-add --apple-use-keychain ~/.ssh/id_rsa
```

## Node.js

I try to avoid installing dependencies globally if at all possible. Otherwise projects that are shared will not have the dependencies necessary to build or work on. For clis that are not bound to a single project I will install globally.

### ~~Yarn~~

~~Mainly switched to Yarn due to Create React App defaulting to Yarn. Not sure of its longevity as npm gets better so just need to watch the trends.~~

### NPM

Switched back to npm. Mainly due to npm catching up in most areas Yarn was ahead and how different Yarn2 ended up being.

### Gatsby

This is necessary for initializing Gatsby websites.

# iTerm2

No particular reason to use this terminal other than I've heard good things about it. I assume some day I'll get into its deeper features but for now just use it pretty plain.

### Theme

I use Wes Bos's Cobalt 2 theme for iTerm2. I know it's a bit outdated now but it's really my first foray into advanced terminal stuff.

[https://github.com/wesbos/Cobalt2-iterm](https://github.com/wesbos/Cobalt2-iterm)

### Powerline fonts

~~Using HomeBrew to install these is a little tricker but in the end I think it's cleaner. Only unclean thing is having to install svn with brew as well...~~

```bash
~~brew install $( brew search powerline | grep -i "\-powerline" | tr '\n' ' ' )~~
```

Decided against the HomeBrew route as it seemed convoluted. Going with plain cloning the git repo and running the install command as shown in the Github repo.

[https://github.com/powerline/fonts](https://github.com/powerline/fonts)

# macOS tweaks

## Remove listing of tags in finder

I just don't use these on files so they just clutter things up. If anyone has a killer use case I'd love to find a use for these but right now it just seems like more work with little gain.

Finder > Preferences > Sidebar > uncheck Recent Tags

## Turn off Automatic opening of safe download files

Audio files would automatically open in Music when downloaded from Safari which is annoying.

Safari > Preferences > General > Uncheck "Open safe files after downloading"

### BetterDummy

Need this app for my 1440p monitor. Apple for some reason disables the ability to do HiDPI with anything less than 4K so it was either too small or pixelated.

[https://github.com/waydabber/BetterDummy](https://github.com/waydabber/BetterDummy)

# Apps

## Google Drive File Stream

This is for sync'ing to Google Docs. Don't use personally but for corporate stuff.

[https://support.google.com/drive/answer/7329379#zippy=%2Cdownload-install-drive-file-stream](https://support.google.com/drive/answer/7329379#zippy=%2Cdownload-install-drive-file-stream)

## OneDrive

I used this to sync all my personal documents and files. Great for sharing between my wife and I as well as multiple devices.

## Microsoft Office

Still a necessary evil in my life and line of work. I installed through the App Store this last go around just to try and keep it simple where things come from and to keep updates regular. Not sure if it makes a difference vs downloading directly from Apple.

- Excel
- OneNote
- PowerPoint
- Word
- Teams - install through website, not currently on App Store

## Microsoft Remote Desktop

Use this a lot with AWS to remote into EC2 machines running Windows.

## Visual Studio Code

This one is obvious for coding.

### Code from command line

To enable using the `code` keyword from the command line to run VS Code:

```bash
CMD+SHIFT+P
shell command
Install code command in path
```

### .vscode folder settings

- NOTE that this won't work if you open the parent folder using _File > Open Folder..._
- Instead open a single project folder and then do _File > Add Folder to Workspace..._ and then save the Workspace

### Fonts

- use Victor Mono ([https://rubjo.github.io/victor-mono/](https://rubjo.github.io/victor-mono/))
  - use the OTF version to install into macOS
  - created a _Coding_ font collection in case I want to turn them on or off, etc...
- turn on ligatures (_Preferences > Settings > Text Editor > Font > Font Ligature)_

### Extensions

- open in browser - for customizing which browser to open files in

## Hot

This is a great tiny app that shows the temperature of the various processors and how much your CPU is being throttled.

[XS-Labs - Apps - Hot - Overview](https://xs-labs.com/en/apps/hot/overview/)

## Chrome

- Hold CMD-Q to quit - turn this feature off
  - From the Chrome top menu, uncheck Warn before quitting

### MakeMKV

I use this to rip my DVDs and Blu-rays so that I can play them through my Plex server.

## VLC

The most versatile video player.

- Blu-ray discs - in order to play Blu-ray disks, there is a setting in the preferences of MakeMKV under Integrations to enable blu-ray disc playback in VLC

## WhatsApp Desktop

I still communicate with a number of people and groups on WhatsApp and it's really nice to use a full keyboard sometimes.

## 1Password

Gotta have a password manager.

- Security preferences - uncheck all the auto-lock options
