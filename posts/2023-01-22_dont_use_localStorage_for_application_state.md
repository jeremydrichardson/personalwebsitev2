---
title: Don’t use localStorage for application state
createDate: "2023-01-22"
description: I’ve seen it a couple times that when a junior developer is trying to figure out how to persist state from different interfaces, they default to localStorage. LocalStorage has its place, but it is not the right option for dealing with application state.
tag: JavaScript, React
author: You
published: true
---

I’ve seen it a couple times that when a junior developer is trying to figure out how to persist state from different interfaces, they default to localStorage. LocalStorage has its place, but it is not the right option for dealing with application state.

## **When to Use**

LocalStorage is used to store data that needs to persist beyond a single user session.

- User preferences
- Application data

## **Don’t confuse with application state**

Application state is something that controls what the interface looks like and options that are presented to the user at any given moment. LocalStorage should not be used for application state:

- Can’t trigger interface updates automatically like useState
- Sync’ing - end up needing to do custom syncing that is tough to manage

## **Alternatives**

- sessionStorage - similar to localStorage but is wiped when the user session is ended (browser tab closed, etc…) - still have sync’ing issue with the main state
- url variables - for state that can be saved with the url, persists with refresh
- React state, useContext
