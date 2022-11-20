---
title: What problem does useState in React solve?
createDate: "2022-11-20"
description: Back in old school JavaScript only days, if you had a variable that held a value that you wanted to show on the screen, you’d update the DOM with that value. The idea of state solves to monotony of this by allowing you to update a variable once and have it update the DOM everywhere its used.
tag: JavaScript, React
author: You
published: true
---

This was a recent question on [r/webdev](https://www.reddit.com/r/webdev/) subreddit.

I thought it would help to give some context through history. Jumping directly into React can be disorienting, especially when you don’t understand the basic reason for its existence. Let’s see how we got here.

Back in old school JavaScript only days, if you had a variable that held a value that you wanted to show on the screen, you’d update the DOM with that value.

```jsx
var myValue = "hello world";
document.getElementById("myElement").innerHTML = myValue;

function myLogic() {
  var myValue = "hello mars";
  document.getElementById("myElement").innerHTML = myValue;
}
```

Every time you updated that variable with a new value, you would have to remember to update the DOM with that new value, otherwise your screen wouldn’t be in sync with your variable. This got super tedious if you needed to update the DOM in 6 places every time your variable updated.

## React - state, state, and more state

React came along and introduced the idea of state.

> State refers to the current value, attributes, or data related to a contained portion of your application

I like to think of state in terms of a traffic light. A traffic light has at least 3 different states. Go, stop, and caution. Internally in the logic of that traffic light, when the state changes it knows to change the light to green, red, and yellow respectively.

With React state, it introduced the idea of components that could contain state variables. You could update a state variable in once place and it would automatically update your DOM every place it was used. It was amazing!

## Declarative vs Imperative

Besides the basic idea of state, this illustrates the idea of declarative vs imperative.

The first example was imperative - change variable then tell the DOM to update because the variable changed.

Declarative is more like, “_I have this variable and I want it linked to all these different places. I’ll tell you when the variable changes and then the framework (in this case React) will figure out how to update the screen._” In this way, we don’t really care how the screen gets updated, React is taking care of that. I just need to tell it when my variable changes.

Hope that helps. It’s really just a simple way to update the screen in multiple places by changing a variable instead of directly modifying the DOM.
