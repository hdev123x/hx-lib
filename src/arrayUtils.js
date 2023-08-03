/**
 * Copyright (c) 2021-
 * FILE DESCRIPTION
 */

/**
 * @desc Merge arrays and remove duplicate items.
 * @param  {...Array<*>} arrays One or many arrays
 * @returns {Array<*>}
 */
export function noDuplicates(...arrays) {
  return noDuplicatesByObject([...arrays].flat());
  // return [...new Set([...arr].flat())];
}

/**
 * @desc Remove items in array of objects where object <key> is duplicated.
 * @param  {Array<object>} array Array of object items
 * @param  {string} key Object key name
 * @returns {Array<object>}
 */
export function noDuplicatesByKey(array, key) {
  const idKey = (item) => item[key];
  return removeDuplicatesByKey(array, idKey);
}

// todo: replace noDuplicatesByObject() with new noDuplicates()
function noDuplicatesByObject(arr) {
  const idKey = (item) => JSON.stringify(item);
  return removeDuplicatesByKey(arr, idKey);
}

function removeDuplicatesByKey(inputArray, keyFunction) {
  const unique = [];
  const obj = {};
  inputArray.forEach((item) => {
    let key = keyFunction(item);
    // undefined key means key is missing and array item should be included!
    if (key === undefined || !obj[key]) {
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

export const range = (start, stop, step = 1) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
