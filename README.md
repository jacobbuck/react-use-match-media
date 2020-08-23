# react-use-match-media

Simple `window.matchMedia` React hook.

## Usage

```jsx
useMatchMedia(mediaQueryString[, initialState])
```

### Parameters

- `mediaQueryString` string representing the media query to parse.
- `initialState` (optional) boolean initial state to return if `window.matchMedia` is not supported, i.e. SSR.

### Return value

Boolean that returns `true` if the document currently matches the media query list.

### Example

```jsx
import useMatchMedia from 'react-use-match-media';

const Example = (props) => {
  const isWideViewport = useMatchMedia('(min-width: 600px)');

  return <div>{isWideViewport ? 'Wide' : 'Narrow'}</div>;
};
```

More examples can be found in the [COOKBOOK.md](./COOKBOOK.md).

## Requirements

Requires a minimum of React version 16.8.0 for the Hooks API.
