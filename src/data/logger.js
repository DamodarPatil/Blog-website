import log from "loglevel";

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
