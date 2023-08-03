/**
 * Copyright (c) 2021-
 * FILE DESCRIPTION
 */

import { random } from './numberUtils';

export function sleep(min, max = null, multiplier = null) {
  return sleepMin(min, max, multiplier);
}

async function sleepMin(min, max = null, multiplier = null) {
  const realMax = max || min + Math.round(multiplier * min);
  await sleepFn(min === realMax ? min : random(min, realMax));
}

function sleepFn(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
