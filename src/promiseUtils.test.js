/**
 * Copyright (c) 2021-
 * FILE DESCRIPTION
 */

import { sleep } from './promiseUtils.js';

test('sleep with min arg only', async () => {
  const startAt = Date.now();
  await sleep(100);
  expect(Date.now() - startAt).toBeGreaterThanOrEqual(100);
});
