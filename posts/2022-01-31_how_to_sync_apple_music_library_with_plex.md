---
title: How to sync Apple Music library with Plex
createDate: "2022-01-31"
description: I still like to use Apple Music for ripping my CDs (yes I still prefer CDs as a master medium...) and for listening to my music on Apple devices. However, I would like to use Plex more so I'm not stuck in the Apple walled garden forever.
tag: Apple Music, iTunes, plex, rsync, samba
author: You
published: true
---

I still like to use Apple Music for ripping my CDs (yes I still prefer CDs as a master medium...) and for listening to my music on Apple devices.

However, I would like to use Plex more so I'm not stuck in the Apple walled garden forever. I decided the simple answer for now was to attempt to sync my Apple music library with Plex and see how that works. So far it seems to be working fairly well.

## Samba share

Make sure you have the Samba share connected before running this. Find out how to do this in the blog [Samba file shares on Raspberry Pi](/blog/samba_file_shares_on_raspberry_pi).

## Rsync

I'm just using the classic rsync CLI command to sync the libraries over my local network:

```bash
rsync --progress --partial -avz ~/Music/Media.localized/Music/ /Volumes/Music
```

I always recommend running it first as a dry run

```bash
rsync --progress --partial --dry-run -avz ~/Music/Media.localized/Music/ /Volumes/Music
```

## Apple Music Tips

Managing an Apple Music library can be a pain in the ass if you have multiple devices, users, servers, etc... I've tried a bunch of things and here is what I've found.

### Don't Store Apple Music library file anywhere other than it's default location

The issue is that macOS keeps that file open all the time so you can never eject the disk that it is on until you logout or shutdown the operating system. You can store the media on an external drive but don't store the music library file on an external drive.

### Download iTunes purchased music so it syncs with Plex