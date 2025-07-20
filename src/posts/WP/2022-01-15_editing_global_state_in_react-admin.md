---
title: Editing Global State in react-admin
createDate: "2022-01-15"
description: I recently came across a question on [StackOverflow](https://stackoverflow.com/questions/70706331/how-can-i-update-redux-store-in-react-admin/70725193#70725193) of someone who was asking how to change the global state of a resource. I answered the question as it was asked, but then gave an explanation of why that is a bad idea.
tag: react-admin, redux
author: You
published: true
---

I recently came across a question on [StackOverflow](https://stackoverflow.com/questions/70706331/how-can-i-update-redux-store-in-react-admin/70725193#70725193) of someone who was asking how to change the global state of a resource. I answered the question as it was asked, but then gave an explanation of why that is a bad idea.

## Answer

### Access Redux Store

You can access the redux store using the useSelector hook made available by the react-redux module.

```jsx
import { useSelector } from "react-redux";

function myComponent() {
  const myReduxData = useSelector(path.to.your.redux.key);

  return <p>myReduxData</p>;
}
```

### Modify Redux Store

To modify data in the redux store you would write a custom reducer. You can hook into many of the actions that are fired automatically by react-admin. [https://marmelab.com/react-admin/Admin.html#customreducers](https://marmelab.com/react-admin/Admin.html#customreducers)

## **Redux is an implementation detail**

Although I gave direction with the above, I would highly recommend not going about it this way. React-admin views redux as an implementation detail (see the bottom of this blog [https://marmelab.com/blog/2020/04/27/react-admin-tutorials-custom-forms-related-records.html](https://marmelab.com/blog/2020/04/27/react-admin-tutorials-custom-forms-related-records.html))

That means you should never update redux directly. A future version of react-admin could realistically replace redux with something else which would break your app. I believe they are waiting for react to release single feature that would make react context versatile enough to replace redux.

**What's the Problem You're Trying to Solve?**

In most cases there is a better, more blessed way to update the global state. Don’t try and update anything to do with the inner workings of react-admin such as resources. You might as well build your own framework as you’re bypassing everything that makes react-admin great.
