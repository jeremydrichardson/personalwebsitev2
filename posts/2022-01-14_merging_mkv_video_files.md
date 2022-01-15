---
title: Merging MKV video files
createDate: "2022-01-14"
description: I’ve been working on backing up all my DVDs to Plex. I finally found a system that was the right level of precision to satisfy the video nerd in me without going overboard. Merging some files is essential with titles that have lots of short clips.
tag: plex, mkv, video
author: You
published: true
---

I’ve been working on backing up all my DVDs to Plex. I finally found a system that was the right level of precision to satisfy the video nerd in me without going overboard.

In most cases I use MakeMKV to copy all the video files off the disc in their native format (so long as it’s mpeg2 or h264).

## Extras

The need for merging comes from wanting to preserve all the extras on a disc without ending up with a million individual video files to click through. Plex does a nice job on a few platforms of presenting extras but it tends to break down if there are too many videos. The interface just gets cluttered.

## Play All

Some titles give the great option of _Play All_. This results in a single file coming off the disc with all clips included. Then just delete all the little individual clips.

## Merge

One of the great things about MKV is that it’s a wrapper file format. That means you can manipulate things with quite a bit of flexibility. In most cases you can do a lot without ever having to re-encode, losing a quality generation and a lot of compute time.

### mkvtoolnix

I found this utility that helps manipulate MKV files. I installed it with Homebrew as I do with most utilities like this.

[https://formulae.brew.sh/cask/mkvtoolnix#default](https://formulae.brew.sh/cask/mkvtoolnix#default)

### mkvmerge

```bash
mkvmerge -o full.mkv file1.mkv + file2.mkv
```

I found so far this seems to work. If I want to merge a number of short clips into one that with play with Plex, this is it.

Here are more detailed docs as well for the multitude of options.

[https://mkvtoolnix.download/doc/mkvmerge.html](https://mkvtoolnix.download/doc/mkvmerge.html)
