/**
 * @jest-environment node
 */
import { useLayoutEffect } from 'react';

jest.mock('react', () => ({ useLayoutEffect: jest.fn() }));

beforeEach(() => {
  jest.resetAllMocks();
});

test('is useLayoutEffect in when `window` global is defined', () => {
  global.window = {};
  let useBrowserLayoutEffect;
  jest.isolateModules(() => {
    useBrowserLayoutEffect = require('../useBrowserLayoutEffect').default;
  });
  expect(useBrowserLayoutEffect).toBe(useLayoutEffect);
  global.window = undefined;
});

test('is noop in when `window` global is undefined', () => {
  expect(global.window).toBeUndefined();
  let useBrowserLayoutEffect;
  jest.isolateModules(() => {
    useBrowserLayoutEffect = require('../useBrowserLayoutEffect').default;
  });
  expect(useBrowserLayoutEffect).not.toBe(useLayoutEffect);
  useBrowserLayoutEffect(() => {});
  expect(useLayoutEffect).not.toHaveBeenCalled();
});
