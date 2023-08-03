/**
 * Copyright (c) 2021-
 * FILE DESCRIPTION
 */

import { noDuplicates, noDuplicatesByKey } from './arrayUtils.js';

test('noDuplicates', () => {
  expect(noDuplicates([])).toEqual([]);
  expect(noDuplicates([], [])).toEqual([]);
  expect(noDuplicates([1])).toEqual([1]);
  expect(noDuplicates([1], [1])).toEqual([1]);
  expect(noDuplicates([1, 1])).toEqual([1]);
  expect(noDuplicates([1, 2])).toEqual([1, 2]);
  expect(noDuplicates([1, 2], [3, 3, 4], [5])).toEqual([1, 2, 3, 4, 5]);
  expect(noDuplicates([1, 2, 2])).toEqual([1, 2]);
  expect(noDuplicates([1, 2, 2, 3])).toEqual([1, 2, 3]);
  expect(noDuplicates([{ foo: 1 }, { foo: 1 }])).toEqual([{ foo: 1 }]);
  expect(noDuplicates([{ foo: 1 }, { foo: 2 }, { foo: 1 }])).toEqual([{ foo: 1 }, { foo: 2 }]);
  expect(noDuplicates([{ foo: 1 }, { foo: 2 }])).toEqual([{ foo: 1 }, { foo: 2 }]);
  expect(noDuplicates([{ foo: 2 }, { foo: 1 }])).toEqual([{ foo: 2 }, { foo: 1 }]);
});

test('noDuplicatesByKey', () => {
  expect(noDuplicatesByKey([], 'foo')).toEqual([]);
  expect(noDuplicatesByKey([], [], 'foo')).toEqual([]);
  expect(noDuplicatesByKey([{ foo: 1 }, { foo: 1 }], 'foo')).toEqual([{ foo: 1 }]);
  expect(noDuplicatesByKey([{ foo: 1 }], 'bar')).toEqual([{ foo: 1 }]);
  expect(noDuplicatesByKey([{ foo: 1 }, { foo: 1 }], 'bar')).toEqual([{ foo: 1 }, { foo: 1 }]);
  expect(
    noDuplicatesByKey(
      [
        { foo: 1, bar: 1 },
        { foo: 2, bar: 1 },
      ],
      'bar'
    )
  ).toEqual([{ foo: 1, bar: 1 }]);
});
