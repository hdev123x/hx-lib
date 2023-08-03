/**
 * Copyright (c) 2021-
 * FILE DESCRIPTION
 */

import { isNumber } from './numberUtils.js';

test('isNumber', () => {
  expect(isNumber(0)).toEqual(true);
  expect(isNumber(10)).toEqual(true);
  expect(isNumber(-10)).toEqual(true);
  expect(isNumber(1.1)).toEqual(true);
  expect(isNumber(true)).toEqual(false);
  expect(isNumber('string')).toEqual(false);
  expect(isNumber([])).toEqual(false);
  expect(isNumber([1])).toEqual(false);
  expect(isNumber({ foo: 1 })).toEqual(false);
});
