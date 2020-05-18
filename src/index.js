import { useEffect, useState } from 'react';

const useMatchMedia = (mediaQueryString) => {
  const [state, setState] = useState(false);
  
  useEffect(() => {
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