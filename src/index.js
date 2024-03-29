import { useState } from 'react';
import invariant from 'tiny-invariant';
import useBrowserLayoutEffect from './useBrowserLayoutEffect';

const useMatchMedia = (mediaQueryString, initialState = false) => {
  invariant(
    typeof mediaQueryString === 'string',
    'Expected `mediaQueryString` to be a string'
  );
  invariant(
    typeof initialState === 'boolean',
    'Expected `initialState` to be a boolean'
  );

  const [state, setState] = useState(initialState);

  useBrowserLayoutEffect(() => {
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
