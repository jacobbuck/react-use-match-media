# Cookbook

Recipes for using react-use-match-media.

## Global Media Queries with React Context

Set your media queries once with `useMatchMedia` and pass down your application
with React Context.

```jsx
import React from 'react';
import useMatchMedia from 'react-use-match-media';

const MediaQueriesContext = React.createContext({ isWideViewport: false, ... });

const MediaQueriesProvider = () => {
  const isWideViewport = useMatchMedia('(min-width: 600px)');
  ...
  return (
    <MediaQueriesContext.Provider value={{ isWideViewport, ... }}>
      {props.children}
    </MediaQueriesContext.Provider>
  );
};

const useMediaQueries = () => React.useContext(MediaQueriesContext);

const Example = (props) => {
  const { isWideViewport, ... } = useMediaQueries();
  ...
};

const App = (props) => {
  return (
    <MediaQueryProvider>
      <Example />
    </MediaQueryProvider>
  );
}
```

## Media Query from Object

Define your media query as an object and stringify with [json2mq](https://www.npmjs.com/package/json2mq).

```jsx
import json2mq from 'json2mq';
import useMatchMedia from 'react-use-match-media';

const wideViewport = json2mq({ minWidth: 600 });

const Example = (props) => {
  const isWideViewport = useMatchMedia(wideViewport);
  ...
};
```
