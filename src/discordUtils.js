/**
 * Copyright (c) 2021-
 * Utility functions for Discord.
 */

import { getLastTokenizedItem } from './stringUtils';

export function extractDiscordHandle(url) {
  return !url ? '' : getLastTokenizedItem(url, '/');
}
