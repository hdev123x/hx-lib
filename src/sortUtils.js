/**
 * Copyright (c) 2021-
 * FILE DESCRIPTION
 */

// todo: only export one sort function that takes any number of properties!

/**
 * @usage  array.sort(dynamicSort('-numSales'));
 */
export function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    var result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

/**
 * @usage  array.sort(dynamicSortMultiple('-numSales', 'id', 'anything'));
 */
export function dynamicSortMultiple() {
  /*
   * save the arguments object as it will be overwritten
   * note that arguments object is an array-like object
   * consisting of the names of the properties to sort by
   */
  var props = arguments;
  return function (obj1, obj2) {
    var i = 0,
      result = 0,
      numberOfProperties = props.length;
    /* try getting a different result from 0 (equal)
     * as long as we have extra properties to compare
     */
    while (result === 0 && i < numberOfProperties) {
      result = dynamicSort(props[i])(obj1, obj2);
      i++;
    }
    return result;
  };
}

export const compareOrderedString = (a, b, ascending) =>
  ascending ? a.toLowerCase().localeCompare(b.toLowerCase()) : b.toLowerCase().localeCompare(a.toLowerCase());

export const compareOrderedNum = (a, b, ascending) => {
  if (typeof a !== 'number' && typeof b !== 'number') {
    return 0;
  }
  if (typeof a !== 'number') {
    return 1;
  }
  if (typeof b !== 'number') {
    return -1;
  }
  if (a === b) {
    return 0;
  }
  return ascending ? a - b : b - a;
};
