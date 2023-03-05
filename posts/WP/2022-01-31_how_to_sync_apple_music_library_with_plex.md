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

If this is setup properly you should be able to do an `ls` at the folder from the terminal:

```bash
cd /Volumes/Music
ls
```

## Rsync

I'm just using the classic rsync CLI command to sync the libraries over my local network:

~~rsync --progress --partial -avz ~/Music/Media.localized/Music/ /Volumes/Music~~

### Update

I realized that it was still trying to copy everything each time with the above command. After doing a little digging I found a [StackExchange](/https://unix.stackexchange.com/) post titled "[See only changes when running rsync](https://unix.stackexchange.com/questions/341413/see-only-changes-when-running-rsync)" that helped me figure it out.

In short, the -a (archive) option isn't able to fully replicate the permissions due to the difference in partition types. Since -a is a shortened version of `-rlptgoD`, I first started with that. Then remove the `-pgo` which deals with the permissions that aren't supported.

Then we added `-i` which only shows the files that have changed making it easier to spot what will get copied when we do the dry run.

Then we end up with:

```bash
// dry run
rsync --progress --partial --dry-run -rltDvzi ~/Music/Media.localized/Music/ /Volumes/Music

// execute
rsync --progress --partial -rltDvzi ~/Music/Media.localized/Music/ /Volumes/Music
```

~~

## Apple Music Tips

Managing an Apple Music library can be a pain in the ass if you have multiple devices, users, servers, etc... I've tried a bunch of things and here is what I've found.

### Don't Store Apple Music library file anywhere other than it's default location

The issue is that macOS keeps that file open all the time so you can never eject the disk that it is on until you logout or shutdown the operating system. You can store the media on an external drive but don't store the music library file on an external drive.

### Download iTunes purchased music so it syncs with Plex
