/**
 * Copyright (c) 2021-
 * FILE DESCRIPTION
 */

export function kFormatter(num, suffix = 'k') {
  if (typeof num !== 'number') {
    return '';
  }
  if (num < 1000) {
    return `<1` + suffix;
  }
  return Math.sign(num) * (Math.abs(num) / 1000).toFixed(0) + suffix;
}

export function pluralize(val, singularText, pluralText) {
  return val === 1 ? singularText : pluralText;
}
