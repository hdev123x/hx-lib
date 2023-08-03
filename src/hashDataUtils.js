/**
 * Copyright (c) 2021-
 * FILE DESCRIPTION
 */

export function createHashData(locationHash) {
  const hashData = {};
  if (typeof locationHash === 'string') {
    locationHash
      .replace('#', '')
      .split('&')
      .map((x) => x.split('=', 2))
      .forEach((kv) => {
        if (!kv || kv.length !== 2 || !kv[0]) {
          // console.log('Skip badly formatted hash:', kv);
          return;
        }
        if (typeof hashData[kv[0]] === 'undefined') {
          hashData[kv[0]] = [];
        }
        hashData[kv[0]].push(kv[1]);
      });
  }
  return {
    hashData,
    get: (key) => {
      return key && hashData[key] ? hashData[key] : null;
    },
    getOne: (key) => {
      return key && hashData[key] && hashData[key].length ? hashData[key][0] : null;
    },
    has: (key, val) => {
      return key && hashData[key] ? hashData[key].includes(val) : false;
    },
    addToUrl: (key, val, url) => {
      return url.includes('#') ? url + `&${key}=${val}` : `#${key}=${val}`;
    },
  };
}
