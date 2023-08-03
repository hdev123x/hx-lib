/**
 * Copyright (c) 2021-
 * FILE DESCRIPTION
 */

export function removeMultiSpace(s) {
  let newString = s;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const lastString = newString;
    newString = newString.replace('  ', ' ');
    if (newString === lastString) {
      break;
    }
  }
  return newString;
}

/*
export function trimMultipleWhitespace(text) {
  let trimmedText = text.replaceAll('\r', '').replaceAll('\n', '');
  while (trimmedText.search('  ') > -1) {
    trimmedText = trimmedText.replaceAll('  ', ' ');
  }
  trimmedText = trimmedText.trim();
  return trimmedText;
}
*/

export function stringToNum(text) {
  return !text ? null : parseInt(text.replaceAll(',', ''), 10);
}

export function stringToFloat(text) {
  return !text ? null : parseFloat(text.replaceAll(',', ''));
}

export function stringToBool(s) {
  if (typeof s !== 'string') {
    return false;
  }
  return s.toLowerCase() === 'true';
}

export const countWord = (string, word) => string.split(word).length - 1;

export const capitalize = (words) =>
  words
    .split(' ')
    .map((w) => w.substring(0, 1).toUpperCase() + w.substring(1))
    .join(' ');

export const normalizeText = (text) => {
  if (!text) {
    return text;
  }
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export function trimChars(str, chars) {
  return trimCharsLeft(trimCharsRight(str, chars), chars);
}

export function trimCharsLeft(str, chars) {
  return str.replace(new RegExp(`^[${chars}]+`), '');
}

export function trimCharsRight(str, chars) {
  return str.replace(new RegExp(`[${chars}]+$`), '');
}

export function trimWhitespace(str) {
  return str.replace(/^\s+|\s+$/g, '');
}

export const removeNonNumbersFromString = (val) => val.replace(/\D/g, '');

export const findLongest = (words) => Math.max(...words.map((el) => el.length));

export const countUpperChars = (s) => {
  return s.length - s.replace(/[A-Ö]/g, '').length;
};

export const countLowerChars = (s) => {
  return s.length - s.replace(/[a-ö]/g, '').length;
};

export function hashCode(s) {
  var hash = 0,
    i,
    chr;
  if (s.length === 0) return hash;
  for (i = 0; i < s.length; i++) {
    chr = s.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

export const slugify = (text) =>
  text
    .replace(/\s|_|\(|\)/g, '-')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

export function getFirstTokenizedItem(str, token) {
  const items = str.split(token);
  return items.length ? items[0] : '';
}

export function getLastTokenizedItem(str, token) {
  const items = str.split(token);
  return items.length ? items[items.length - 1] : '';
}

export function onlyNumbers(str) {
  return /^[0-9.,]+$/.test(str);
}

export function toLowerCaseIfString(val) {
  return typeof val === 'string' ? val.toLowerCase() : val;
}

export function valOrDefault(val, defaultVal) {
  return val === undefined || val === null ? defaultVal : val;
}

export function convertToHTMLInputFieldString(val) {
  const newVal = valOrDefault(val, '');
  return newVal + '';
}
