/**
 * Copyright (c) 2021-
 * FILE DESCRIPTION
 */

import { kFormatter, pluralize } from './miscUtils';

test('kFormatter', () => {
  expect(kFormatter(-1)).toEqual('<1k');
  expect(kFormatter(0)).toEqual('<1k');
  expect(kFormatter(999)).toEqual('<1k');
  expect(kFormatter(999, 'x')).toEqual('<1x');
  expect(kFormatter(1000)).toEqual('1k');
  expect(kFormatter(1000, 'x')).toEqual('1x');
  expect(kFormatter(1000000)).toEqual('1000k');
});

test('pluralize', () => {
  expect(pluralize(-1, 'apple', 'apples')).toEqual('apples');
  expect(pluralize(0, 'apple', 'apples')).toEqual('apples');
  expect(pluralize(1, 'apple', 'apples')).toEqual('apple');
  expect(pluralize(2, 'apple', 'apples')).toEqual('apples');
});
