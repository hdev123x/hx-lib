const DEFAULT_LOG_LEVEL = 'debug';

export function createLogger(logLevel = null) {
  let whatLogLevel = getLogLevelFromURL() || logLevel || DEFAULT_LOG_LEVEL;
  let log = () => {};
  let trace = () => {};
  if (whatLogLevel === 'debug') {
    log = console.log.bind(console);
  }
  if (whatLogLevel === 'trace') {
    log = console.log.bind(console);
    trace = console.log.bind(console);
  }
  return {
    log,
    trace,
    error: console.error.bind(console),
    warn: console.warn.bind(console),
    info: console.info.bind(console),
  };
}

export function createLogLevelArg(url = null) {
  const logLevel = getLogLevelFromURL(url);
  return logLevel ? `hxlog=${logLevel}` : '';
}

// todo: rename to getLogLevel
function getLogLevelFromURL(url = null) {
  const href = url || location?.href?.toLowerCase();
  if (href.includes('hxlog=debug')) {
    return 'debug';
  }
  if (href.includes('hxlog=trace')) {
    return 'trace';
  }
  return '';
}
