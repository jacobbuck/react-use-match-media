# react-use-match-media

React component and hook which detect mouse clicks outside of an element.

## Usage

```jsx
useMatchMedia(mediaQueryString[, initialState])
```

### Parameters

- `mediaQueryString` 
- `initialState` (optional) boolean

### Example

```jsx
import useMatchMedia from 'react-use-match-media';

const Example = props => {
  const isWideViewport = useMatchMedia('(min-width: 600px)');

  return <div>{isWideViewport ? 'Wide' : 'Narrow'}</div>;
};
```

## Requirements

Requires a minimum of React version 16.8.0 for the Hooks API.
