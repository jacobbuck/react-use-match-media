import { useEffect, useMemo, useState } from 'react';

const matchMediaStub = mediaQueryString => ({
  addListener: () => {},
  matches: false,
  query: mediaQueryString,
  removeListener: () => {},
});

const useMatchMedia = mediaQueryString => {  
  const mediaQueryList = useMemo(
    () => (window.matchMedia || matchMediaStub)(mediaQueryString),
    [mediaQueryString]
  );
  
  const [matches, setMatches] = useState(() => mediaQueryList.matches);
  
  useEffect(() => {
    const listener = () => setMatches(mediaQueryList.matches);
    
    mediaQueryList.addListener(listener);
    
    return () => {
      mediaQueryList.removeListener(listener);
    };
  }, [mediaQueryList]);
  
  return matches;
};

export default useMatchMedia;