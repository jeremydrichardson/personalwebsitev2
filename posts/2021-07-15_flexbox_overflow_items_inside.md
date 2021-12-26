---
title: Flexbox and overflow items inside
date: 2021/07/15
description: Ran into an issue where we were trying to use a kanban React component inside of react-admin. The issue was we wanted only the content area the kanban occupied to scroll and not the entire react-admin interface.
tag: flexbox, kanban, react-admin
author: You
---

# Flexbox and overflow items inside

Tags: flexbox, kanban, react-admin

Ran into an issue where we were trying to use a kanban React component inside of react-admin. The issue was we wanted only the content area the kanban occupied to scroll and not the entire react-admin interface.

The issue is the when flexbox contains content that is wider than the area it has to occupy it will expand. Doesn't matter if you set overflow, the flexbox will expand.

The short solution is to set width:0 on the flex item. Because we were dealing with React components we decided to do inline directly in the component.

```jsx
<div style={{ display: 'flex' }}>
  <Board
    data={kanbanData}
    style={{ width: '0', overflowX: 'scroll', flexGrow: '1' }}
  />
</div>
```

You can find more details on this problem from Chris Coyier

[https://css-tricks.com/flexbox-truncated-text/](https://css-tricks.com/flexbox-truncated-text/)
