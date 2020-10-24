import { act, renderHook } from '@testing-library/react-hooks';
import matchMediaMock from 'match-media-mock';
import useMatchMedia from '..';

const renderUseMatchMediaHook = (...args) =>
  renderHook(() => useMatchMedia(...args));

test('throws TypeError if mediaQueryString is not string', () => {
  const { result } = renderUseMatchMediaHook({});
  expect(result.error).toEqual(
    new TypeError(
      'Expected `mediaQueryString` to be of type `string`, but received type `object`'
    )
  );
});

test('throws TypeError if initialState is not a boolean', () => {
  const { result } = renderUseMatchMediaHook('(max-width: 1280px)', 1);
  expect(result.error).toEqual(
    new TypeError(
      'Expected `initialState` to be of type `boolean`, but received type `number`'
    )
  );
});

test('doesn’t typecheck in production', () => {
  const env = process.env;
  process.env = { NODE_ENV: 'production' };

  const { result } = renderUseMatchMediaHook({});
  expect(result.error).not.toEqual(
    new TypeError(
      'Expected `mediaQueryString` to be of type `string`, but received type `object`'
    )
  );

  process.env = env;
});

describe('window.matchMedia is supported', () => {
  beforeEach(() => {
    window.matchMedia = matchMediaMock.create();
    window.matchMedia.setConfig({ type: 'screen', width: 1200 });
  });

  afterEach(() => {
    delete window.matchMedia;
  });

  test('returns true if mediaQueryString matches', () => {
    const { result } = renderUseMatchMediaHook('(max-width: 1280px)');

    expect(result.current).toBe(true);
  });

  test('returns false if mediaQueryString does not match and initialState is set', () => {
    const { result } = renderUseMatchMediaHook('(max-width: 1024px)', true);

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
    const { result } = renderUseMatchMediaHook('(max-width: 1280px)');

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
    const { result } = renderUseMatchMediaHook('(max-width: 1280px)');
    expect(result.current).toBe(false);
  });

  test('returns initialState if set', () => {
    const { result } = renderUseMatchMediaHook('(max-width: 1280px)', true);
    expect(result.current).toBe(true);
  });
});
