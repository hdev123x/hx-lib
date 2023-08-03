/**
 * Copyright (c) 2021-
 * FILE DESCRIPTION
 */

export const ONE_SECOND = 1 * 1000;
export const ONE_MINUTE = 60 * ONE_SECOND;
export const ONE_HOUR = 60 * ONE_MINUTE;
export const ONE_DAY = 24 * ONE_HOUR;

export function isValidDate(date) {
  // An invalid date object returns NaN for getTime() and NaN is the only object not strictly equal to itself.
  date.getTime() === date.getTime();
}

export function isToday(someDate) {
  const today = new Date();
  return someDate.getDate() == today.getDate() && someDate.getMonth() == today.getMonth() && someDate.getFullYear() == today.getFullYear();
}

export function millisecondsAhead(ms, date = null) {
  return (date ?? new Date()).getTime() + ms;
}

// MONTHS

export function convertTextToMonthNum(text) {
  if (!text) {
    return null;
  }

  const monthText = text.toLowerCase().replaceAll('.', '').replaceAll(',', '').trim();
  if (monthText.startsWith('jan')) {
    return 1;
  }
  if (monthText.startsWith('feb')) {
    return 2;
  }
  if (monthText.startsWith('mar')) {
    return 3;
  }
  if (monthText.startsWith('apr')) {
    return 4;
  }
  if (monthText.startsWith('may')) {
    return 5;
  }
  if (monthText.startsWith('jun')) {
    return 6;
  }
  if (monthText.startsWith('jul')) {
    return 7;
  }
  if (monthText.startsWith('aug')) {
    return 8;
  }
  if (monthText.startsWith('sep')) {
    return 9;
  }
  if (monthText.startsWith('oct')) {
    return 10;
  }
  if (monthText.startsWith('nov')) {
    return 11;
  }
  if (monthText.startsWith('dec')) {
    return 12;
  }
  return 0;
}

export function convertMonthNumToText(monthNum) {
  if (typeof monthNum !== 'number' || monthNum < 1) {
    return 'Error MonthNum: ' + monthNum;
  }
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  try {
    return months[monthNum - 1];
  } catch (e) {
    return 'Error MonthNum: ' + monthNum;
  }
}

// DATE ARITHMETIC

export function addToDate(date, { days = 0, hours = 0, minutes = 0, seconds = 0, ms = 0 }) {
  const newDate = new Date(date);
  const secondsToAdd = (days ? days * 24 * 60 * 60 : 0) + (hours ? hours * 60 * 60 : 0) + (minutes ? minutes * 60 : 0) + (seconds ?? 0);
  newDate.setSeconds(newDate.getSeconds() + secondsToAdd);
  return new Date(newDate.getTime() + ms);
}

// BETWEEN DATES

export function daysBetween(date1, date2) {
  return betweenDates(date1, date2, ONE_DAY);
}

export function hoursBetween(date1, date2) {
  return betweenDates(date1, date2, ONE_HOUR);
}

export function minutesBetween(date1, date2) {
  return betweenDates(date1, date2, ONE_MINUTE);
}

export function secondsBetween(date1, date2) {
  return betweenDates(date1, date2, ONE_SECOND);
}

export function millisecondsBetween(date1, date2) {
  return betweenDates(date1, date2, 1);
}

function betweenDates(date1, date2, base) {
  // base: hours * minutes * seconds * milliseconds
  return Math.round(Math.abs((date1 - date2) / base));
}

// TIMESTAMP

export function timestampToISOString(val, errStr = 'null') {
  return typeof val !== 'number' ? errStr : new Date(val).toISOString();
}

export function timestampToLocaleString(val, errStr = 'null', locale = null) {
  return typeof val !== 'number' ? errStr : new Date(val).toLocaleString(locale || undefined);
}

export function timestampToLocaleDateString(val, errStr = 'null', locale = null) {
  return typeof val !== 'number' ? errStr : new Date(val).toLocaleDateString(locale || undefined);
}

export function timestampToLocaleTimeString(val, errStr = 'null', locale = null, options = {}) {
  return typeof val !== 'number' ? errStr : new Date(val).toLocaleTimeString(locale || undefined, options);
}

// MISC

export function dateLogStr() {
  return new Date().toISOString();
}
