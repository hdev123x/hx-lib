/**
 * Copyright (c) 2021-
 * FILE DESCRIPTION
 */

// todo: rename random() -> randomInt()
export function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomFloat() {
  return Math.random();
}

export function isNumber(n) {
  return typeof n === 'number';
}

export function isInteger(n) {
  return Number.isSafeInteger(n);
  // return n === +n && n === (n | 0);
}

export function isFloat(n) {
  return isNumber(n) && !isInteger(n);
  // return n === +n && n !== (n | 0);
}

export function round(n, decimals) {
  // Source: https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
  let roundN = n;
  roundN = +roundN.toFixed(decimals);
  return roundN;
}
