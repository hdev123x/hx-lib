/**
 * Copyright (c) 2021-
 * FILE DESCRIPTION
 */

import { getLastTokenizedItem } from './stringUtils';

export function extractDiscordHandle(url) {
  return !url ? '' : getLastTokenizedItem(url, '/');
}
