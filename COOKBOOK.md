# Cookbook

Recipes for using react-use-match-media.

## Global Media Queries with React Context

Set your media queries once with `useMatchMedia` and pass down your application
with React Context.

```jsx
import React from 'react';
import useMatchMedia from 'react-use-match-media';

const MediaQueryContext = React.createContext({ isWideViewport: false });

const MediaQueryProvider = () => {
  const isWideViewport = useMatchMedia('(min-width: 600px)');

  return (
    <MediaQueryContext.Provider value={{ isWideViewport }}>
      {props.children}
    </MediaQueryContext.Provider>
  );
};

const useMediaQueries = () => React.useContext(MediaQueryContext);

...

const Example = (props) => {
  const { isWideViewport } = useMediaQueries();

  ...
};

...

const App = (props) => {
  ...

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

...

const Example = (props) => {
  const isWideViewport = useMatchMedia(json2mq({ minWidth: 600 }));
  ...
};
```
