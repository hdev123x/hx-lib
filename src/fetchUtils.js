/**
 * Copyright (c) 2021-
 * FILE DESCRIPTION
 */

import { sleep } from './promiseUtils';

const DEFAULT_RETRY_AFTER_SECS = 30;

// todo: add timeout handling!
/**
 * @returns { data: json | text, response: stream, ok: boolean, error: number | json }
 */
export async function fetchHelper(url, options = {}, rateLimitHandler = null) {
  try {
    let response;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      response = await fetch(url, options);
      if (response.status === 429 && rateLimitHandler && (await rateLimitHandler(response, options.retryAfter))) {
        // rate limit handled by caller, try to fetch again!
        continue;
      }
      break;
    }
    if (response.status === 429) {
      return { error: 429, retryAfter: response.headers.get('retry-after'), response };
    }
    const data = response.headers.get('content-type')?.includes('application/json') ? await response.json() : await response.text();
    return { data, response, ok: response.ok, error: response.ok ? 0 : response.status };
  } catch (e) {
    console.error('Fetch error:', e);
    return { data: null, response: e?.response, error: e };
  }
}

export async function rateLimitHandler(response, retryAfter = null) {
  const secs = parseRetryAfter(response.headers.get('retry-after')) || retryAfter || DEFAULT_RETRY_AFTER_SECS;
  console.info(`Rate Limit Handler, wait ${secs} seconds`);
  await sleep(secs * 1000);
  return true;
}

function parseRetryAfter(header, errorVal = null) {
  try {
    const value = Number(header);
    if (!Number.isNaN(value)) {
      return value;
    }
    // Or HTTP date time string
    const dateTime = Date.parse(header);
    if (!Number.isNaN(dateTime)) {
      return Number((dateTime - Date.now()) / 1000);
    }
    return errorVal;
  } catch (error) {
    return errorVal;
  }
}
