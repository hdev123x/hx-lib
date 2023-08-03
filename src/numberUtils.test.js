/**
 * Copyright (c) 2021-
 * FILE DESCRIPTION
 */

import { isNumber, isInteger, isFloat, round, randomInt, randomFloat } from './numberUtils.js';

test('isNumber', () => {
  expect(isNumber(0)).toEqual(true);
  expect(isNumber(10)).toEqual(true);
  expect(isNumber(-10)).toEqual(true);
  expect(isNumber(1.1)).toEqual(true);
  expect(isNumber(0.000000000001)).toEqual(true);
  expect(isNumber(Date.now())).toEqual(true);
  expect(isNumber(true)).toEqual(false);
  expect(isNumber(false)).toEqual(false);
  expect(isNumber('10')).toEqual(false);
  expect(isNumber('string')).toEqual(false);
  expect(isNumber([])).toEqual(false);
  expect(isNumber([1])).toEqual(false);
  expect(isNumber({ foo: 1 })).toEqual(false);
  expect(isNumber(new Date())).toEqual(false);
  expect(isNumber(null)).toEqual(false);
  expect(isNumber(undefined)).toEqual(false);
});

test('isInteger', () => {
  expect(isInteger(0)).toEqual(true);
  expect(isInteger(10)).toEqual(true);
  expect(isInteger(-10)).toEqual(true);
  expect(isInteger(Number.MAX_SAFE_INTEGER)).toEqual(true);
  expect(isInteger(Date.now())).toEqual(true);
  expect(isInteger(1.1)).toEqual(false);
  expect(isInteger(-1.1)).toEqual(false);
  expect(isInteger(0.000000000001)).toEqual(false);
  expect(isInteger(Number.MAX_VALUE)).toEqual(false);
  expect(isInteger(true)).toEqual(false);
  expect(isInteger(false)).toEqual(false);
  expect(isInteger('10')).toEqual(false);
  expect(isInteger('string')).toEqual(false);
  expect(isInteger([])).toEqual(false);
  expect(isInteger([1])).toEqual(false);
  expect(isInteger({ foo: 1 })).toEqual(false);
  expect(isInteger(new Date())).toEqual(false);
  expect(isInteger(null)).toEqual(false);
  expect(isInteger(undefined)).toEqual(false);
});

test('isFloat', () => {
  expect(isFloat(0)).toEqual(false);
  expect(isFloat(10)).toEqual(false);
  expect(isFloat(-10)).toEqual(false);
  expect(isFloat(Number.MAX_SAFE_INTEGER)).toEqual(false);
  expect(isFloat(Date.now())).toEqual(false);
  expect(isFloat(1.1)).toEqual(true);
  expect(isFloat(-1.1)).toEqual(true);
  expect(isFloat(0.000000000001)).toEqual(true);
  expect(isFloat(Number.MAX_VALUE)).toEqual(true);
  expect(isFloat(true)).toEqual(false);
  expect(isFloat(false)).toEqual(false);
  expect(isFloat('10')).toEqual(false);
  expect(isFloat('string')).toEqual(false);
  expect(isFloat([])).toEqual(false);
  expect(isFloat([1])).toEqual(false);
  expect(isFloat({ foo: 1 })).toEqual(false);
  expect(isFloat(new Date())).toEqual(false);
  expect(isFloat(null)).toEqual(false);
  expect(isFloat(undefined)).toEqual(false);
});

test('round', () => {
  expect(round(0, 0)).toEqual(0);
  expect(round(0, 1)).toEqual(0);
  expect(round(1, 0)).toEqual(1);
  expect(round(1, 1)).toEqual(1);
  expect(round(1.2, 0)).toEqual(1);
  expect(round(1.2, 1)).toEqual(1.2);
  expect(round(1.2, 2)).toEqual(1.2);
  expect(round(1.2345, 1)).toEqual(1.2);
  expect(round(1.2345, 2)).toEqual(1.23);
  expect(round(1.2345, 3)).toEqual(1.234);
  expect(round(1.2345, 4)).toEqual(1.2345);
  expect(round(1.2345, 5)).toEqual(1.2345);
  expect(round(-1, 0)).toEqual(-1);
  expect(round(-1, 1)).toEqual(-1);
  expect(round(-1.2, 0)).toEqual(-1);
  expect(round(-1.2, 1)).toEqual(-1.2);
  expect(round(-1.2, 2)).toEqual(-1.2);
});

test('randomInt', () => {
  expect(randomInt(0, 0)).toEqual(0);
  expect(randomInt(0, 1)).toBeGreaterThanOrEqual(0);
  expect(randomInt(0, 1)).toBeLessThanOrEqual(1);
  expect(randomInt(1, 2)).toBeGreaterThanOrEqual(1);
  expect(randomInt(1, 2)).toBeLessThanOrEqual(2);
});

test('randomFloat', () => {
  expect(randomFloat()).toBeGreaterThanOrEqual(0);
  expect(randomFloat()).toBeLessThan(1);
});
