---
title: Multiple Audio Tracks in Chrome Video Player
date: 2021/11/15
description: In order to access multiple audio tracks embedded into an MP4 you must first enable the audioTracks capability (see caniuse for how).
tag: Chrome, audio, video
author: You
published: true
---

# Multiple Audio Tracks in Chrome Video Player

Tags: Chrome, audio, video

In order to access multiple audio tracks embedded into an MP4 you must first enable the audioTracks capability (see caniuse for how).

When you change audioTracks with Javascript in Chrome, the audio continues but the video pauses for a number of seconds before resuming rendering it out of sync.

The workaround is to use the `currentTime` property on your video element right after you change the audio track. I ended up just setting it to itself so the video would continue right from where the audio track change was made.

In this example I'm using a select dropdown to list the audio track that can be selected.

```js
function handleAudioTrackChange(e) {
  const videoPlayer = document.getElementById("video-player");

  for (var i = 0; i < videoPlayer.audioTracks.length; i += 1) {
    videoPlayer.audioTracks[i].enabled = false;
  }
  videoPlayer.audioTracks[e.currentTarget.value].enabled = true;

  // This is to fix a Chrome bug where the audio and video goes out of sync
  // eslint-disable-next-line no-self-assign
  videoPlayer.currentTime = videoPlayer.currentTime;
}
```

I just expanded on the idea on the bug report for Chromium:

[1034436 - chromium - An open-source project to help move the web forward. - Monorail](https://bugs.chromium.org/p/chromium/issues/detail?id=1034436&q=audioTracks&can=2)

The same should apply to any Chromium based browser.

Still hoping to get the mixing of multiple audio tracks at some point. Right now it's just one at a time, not all mixed together.
