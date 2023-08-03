/**
 * Copyright (c) 2021-
 * FILE DESCRIPTION
 */

export function random(min = null, max = null) {
  if (min !== null && max != null) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return Math.random;
  }
}

export const isNumber = (n) => typeof n === 'number';

export function round(num, decimals) {
  // Source: https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
  let n = num;
  n = +n.toFixed(decimals);
  return n;
}
