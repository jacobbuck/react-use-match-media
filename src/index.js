import { useState } from 'react';
import useIsomorphicLayoutEffect from 'use-isomorphic-layout-effect';

const useMatchMedia = (mediaQueryString, initialState = false) => {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof mediaQueryString !== 'string') {
      throw new TypeError('Expected `mediaQueryString` to be a string');
    }
    if (typeof initialState !== 'boolean') {
      throw new TypeError('Expected `initialState` to be a boolean');
    }
  }

  const [state, setState] = useState(initialState);

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia) {
      const mediaQueryList = window.matchMedia(mediaQueryString);

      const updateState = () => {
        setState(mediaQueryList.matches);
      };
      updateState();

      mediaQueryList.addListener(updateState);
      return () => {
        mediaQueryList.removeListener(updateState);
      };
    }
  }, [mediaQueryString]);

  return state;
};

export default useMatchMedia;
