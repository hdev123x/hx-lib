/**
 * Copyright (c) 2021-
 * FILE DESCRIPTION
 */

export function getQueryParam(href, key) {
  return getSearchParam(href, key);
}

export function getSearchParam(href, key) {
  return new URL(href).searchParams.get(key);
}

export function addQueryParam(url, key, val) {
  if (!key || !val) {
    return url;
  }
  const prefix = url.includes('?') ? '&' : '?';
  return url + `${prefix}${key}=${val}`;
}

export const isValidURL = (uri) => {
  try {
    return new URL(uri);
  } catch (_) {
    return false;
  }
};

export function removeHashFromUrl(url) {
  const index = url.indexOf('#');
  return index > 0 ? url.substr(0, index) : url;
}

export function extractURLs(text) {
  // eslint-disable-next-line no-useless-escape
  const re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
  const matches = [...text.matchAll(re)];
  return matches.map((x) => x[0]);
}
