import log from "loglevel";

/**
 * Logger module using loglevel for logging messages with different severity levels.
 * Adds a timestamp to each log message.
 * Default log level is set to "info".
 */

// Set the default log level (trace, debug, info, warn, error)
log.setLevel("info");

const originalFactory = log.methodFactory;

log.methodFactory = (methodName, logLevel, loggerName) => {
  const rawMethod = originalFactory(methodName, logLevel, loggerName);
  return (...args) => {
    rawMethod(`[${new Date().toISOString()}]`, ...args);
  };
};

// Apply the new method factory
log.setLevel(log.getLevel());

export const logger = log;
