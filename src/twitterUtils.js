/**
 * Copyright (c) 2021-
 * Utility functions for Twitter.
 */

import { getSearchParam } from './webUtils';

export function extractTwitterHandle(url) {
  if (!url) {
    return '';
  }

  const screenName = getSearchParam(url, 'screen_name');
  if (screenName) {
    return screenName;
  }

  const match = url.match(/^(?:https?:)?(?:\/\/)?(www\.)?twitter.com\/@?(?<handle>\w+)/);
  return match?.groups?.handle ? `${match.groups.handle}` : '';
}

export function makeTwitterURL(handle) {
  return `https://twitter.com/${handle}`;
}

export function convertTwitterSnowflakeToDate(snowflake) {
  const TWITTER_EPOCH = 1288834974657;
  return new Date(Number(snowflake) / 4194304 + TWITTER_EPOCH);
}
