import { useLayoutEffect, useState } from 'react';

const useMatchMedia = (mediaQueryString, initialState = false) => {
  const [state, setState] = useState(initialState);

  useLayoutEffect(() => {
    if (window.matchMedia) {
      const mediaQueryList = window.matchMedia(mediaQueryString);

      const updateState = () => setState(mediaQueryList.matches);
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
