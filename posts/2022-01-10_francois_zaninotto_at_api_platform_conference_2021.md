---
title: François Zaninotto at API Platform Conference 2021
createDate: "2022-01-10"
description: I just watch a video by Marmelab founder and CEO François Zaninotto at the API Platform Conference 2021. In it he detailed out some of the great benefits and features inherent in react-admin. I often like watching conference talks like this as they don’t tend to be beginner level topics but cover real world problems that I am dealing with.
tag: react-admin, REST, react
author: You
published: true
---

I just watch a video by Marmelab founder and CEO François Zaninotto at the API Platform Conference 2021. In it he detailed out some of the great benefits and features inherent in react-admin. I often like watching conference talks like this as they don’t tend to be beginner level topics but cover real world problems that I am dealing with.

<iframe width="560" height="315" src="https://www.youtube.com/embed/3m5An-s0r-k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

I thought to highlight some of my favorite points both for my own second brain and for anyone who wants a taste of what he covered.

## Pro Tip #2: Learn react-admin with the demos

This has definitely been my experience. Make sure you check out the demo sites they have built that detail with full open-source code some of the more advanced and recommended methods.

[Posters Galore](https://marmelab.com/react-admin-demo/#/login) - an e-commerce style poster shop ([source code](https://github.com/marmelab/react-admin/tree/master/examples/demo))

[CRM](https://marmelab.com/react-admin-crm/) - a customer relationship management system ([source code](https://github.com/marmelab/react-admin/tree/master/examples/crm))

## Pro Tip #3: Know you context

Context was a hard one to wrap my head around but finally with some of the more recent features of react-admin, I think I get it. In his talk, François has a great way of comparing context and redux, both of which are used extensively in react-admin.

One of the key use cases that brought it together for me was with the useRecordContext hook. With this hook your could grab information about the current record.

In this example we’re using the record context for a tasks widget on the dashboard.

```jsx
const ItemInfo = () => {
  const record = useRecordContext();

  const currentYear = new Date().getFullYear();
  const taskYear = new Date(`${record.date_end} 00:00`).getFullYear();
  const dateOptions = { month: "short", day: "numeric" };
  if (taskYear !== currentYear) dateOptions.year = "numeric";

  return (
    <Grid container direction="column" justifyContent="flex-start">
      <Grid item>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <TextField
              source="name"
              variant="body1"
              component="span"
              color="textPrimary"
            />
          </Grid>
          <Grid item>
            <DateField
              source="date_end"
              variant="body2"
              options={dateOptions}
              component="p"
              color="textSecondary"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        <ReferenceField
          label="Project"
          source="project_id"
          reference="projects"
          basePath="projects"
          link={false}
        >
          <FunctionField
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
            render={(record) => `${record.num} - ${record.name}`}
            variant="caption"
            component="p"
            color="textSecondary"
          />
        </ReferenceField>
      </Grid>
    </Grid>
  );
};
```

What makes the above example interesting is that we’re also creating our own record context that is different from the one loaded by the page, since of course the dashboard doesn’t actually have a record context.

```jsx
const SimpleTaskList = () => {
  const { data, ids, refetch } = useListContext();
  const records = ids.map((id) => data[id]);
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <MuiList>
      {records.map((record) => (
        <RecordContextProvider key={record.id} value={record}>
          <ListItem
            button
            component={Link}
            to={`/tasks/${record.id}`}
            alignItems="flex-start"
          >
            <ListItemAvatar>
              {taskIcons[record.name] ? (
                createElement(taskIcons[record.name])
              ) : (
                <CheckCircle />
              )}
            </ListItemAvatar>
            <ListItemText
              disableTypography
              primary={<ItemInfo />}
              className={classes.listItemText}
            />
            <ListItemSecondaryAction>
              <TaskStatusToggleButton
                record={record}
                variant="iconButton"
                forceReloadFn={refetch}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </RecordContextProvider>
      ))}
    </MuiList>
  );
};
```

Here we loop over a list of records we fetched and create a record context for each with `RecordContextProvider`.

The magic behind that is then you can use all the react-admin fields like we’re using in the `<ItemInfo />` component. No need to pass numerous props down the chain, all the record data is just available.

## Pro Tip #9: Add custom dataProvider methods

At all times we try to adhere to REST methodology when building our API. However, since we are adapting a legacy system, there is just some functionality that doesn’t quite fit.

For these cases we created a dataProvider method called `rpc` that allows us to make non-standard REST calls using our own methodology. Again, this is a temporary solution that we hope to rectify as we have the ability to change the backend. But for now this proved useful.

```jsx
rpc: (resource, params) => {
      console.log(resource, params);
      const url = getResourceURL(resource, "rpc", params);
      const data = params.data;
      return httpClient
        .post(apiName, url, {
          ...httpClientInit,
          body: data || {},
        })
        .then((item) => {
          return {
            data: { ...item.data },
          };
        })
        .catch(handleError);
    },
```

## Pro Tip #21: Use Material-UI Datagrid

This is one I still have to look into but it sounds promising. I’m always into using the dependencies I already have and the fact the Material-UI datagrid now does more is great.

```jsx
import { Datagrid } from "ra-datagrid";
```

Keep in mind you need to define the columns in Javascript instead of with the react-admin field components. A different flavor but could be worth it for the extra features.

## Pro Tip #35: Use react-final-form

Definitely have had experience with this one. I’ll probably need to write an entire blog post on this one because there was so much to it and it’s not at the top of my brain right now.
