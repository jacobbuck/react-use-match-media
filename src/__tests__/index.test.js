import { act, renderHook } from '@testing-library/react-hooks';
import matchMediaMock from 'match-media-mock';
import useMatchMedia from '..';

describe('window.matchMedia is supported', () => {
  beforeEach(() => {
    window.matchMedia = matchMediaMock.create();
    window.matchMedia.setConfig({ type: 'screen', width: 1200 });
  });

  afterEach(() => {
    delete window.matchMedia;
  });

  test('returns true if mediaQueryString matches', () => {
    const { result } = renderHook(() => useMatchMedia('(max-width: 1280px)'));

    expect(result.current).toBe(true);
  });

  test('returns false if mediaQueryString does not match and initialState is set', () => {
    const { result } = renderHook(() =>
      useMatchMedia('(max-width: 1024px)', true)
    );

    expect(result.current).toBe(false);
  });

  test('handles mediaQueryString change', () => {
    const { rerender, result } = renderHook(
      ({ mediaQueryString }) => useMatchMedia(mediaQueryString),
      {
        initialProps: { mediaQueryString: '(max-width: 1280px)' },
      }
    );

    expect(result.current).toBe(true);

    rerender({ mediaQueryString: '(max-width: 1024px)' });

    expect(result.current).toBe(false);
  });

  test('listens to MediaQueryList changes', () => {
    const { result } = renderHook(() => useMatchMedia('(max-width: 1280px)'));

    expect(result.current).toBe(true);

    act(() => {
      window.matchMedia.setConfig({ type: 'screen', width: 1600 });
    });

    expect(result.current).toBe(false);
  });
});

describe('window.matchMedia is not supported', () => {
  beforeEach(() => {
    expect(window.matchMedia).toBeUndefined();
  });

  test('returns false', () => {
    const { result } = renderHook(() => useMatchMedia('(max-width: 1280px)'));

    expect(result.current).toBe(false);
  });

  test('returns initialState if set', () => {
    const { result } = renderHook(() =>
      useMatchMedia('(max-width: 1280px)', true)
    );

    expect(result.current).toBe(true);
  });
});
