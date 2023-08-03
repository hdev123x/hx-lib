/**
 * Copyright (c) 2021-
 * FILE DESCRIPTION
 */

export const range = (start, stop, step = 1) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function noDuplicates(...arr) {
  return [...new Set([...arr].flat())];
}

export function noDuplicatesByKey(arr, keyName) {
  const idKey = (item) => item[keyName];
  return removeDuplicatesByKey(arr, idKey);
}

export function noDuplicatesByObject(arr) {
  const idKey = (item) => JSON.stringify(item);
  return removeDuplicatesByKey(arr, idKey);
}

function removeDuplicatesByKey(inputArray, keyFunction) {
  const unique = [];
  const obj = {};
  inputArray.forEach((item) => {
    let key = keyFunction(item);
    if (!obj[key]) {
      unique.push(item);
      obj[key] = item;
    }
  });
  return unique;
}

/*
Note: Old version, replaced by noDuplicatesByObject, keep it for now!
export function removeDupsFromArray(arr) {
  return arr.filter((value, index) => {
    const _value = JSON.stringify(value);
    return (
      index ===
      arr.findIndex((obj) => {
        return JSON.stringify(obj) === _value;
      })
    );
  });
}
*/
