---
title: Sync'ing Apple Music library with Plex Server
date: 2021/3/18
description: I still like to use Apple Music for ripping my CDs (yes I still prefer CDs as a master medium...) and for listening to my music on Apple devices.
tag: Apple Music, Plex
author: You
---

# Sync'ing Apple Music library with Plex Server

Tags: plex

I still like to use Apple Music for ripping my CDs (yes I still prefer CDs as a master medium...) and for listening to my music on Apple devices.

However, I would like to use Plex more so I'm not stuck in the Apple walled garden forever. I decided the simple answer for now was to attempt to sync my Apple music library with Plex and see how that works. So far it seems to be working fairly well.

I'm just using the classic rsync CLI command to sync the libraries over my local network:

```jsx
rsync --progress --partial -avz ~/Music/Media.localized/Music/ /Volumes/Music
```
