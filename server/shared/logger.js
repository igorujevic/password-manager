'use strict';

const bunyan = require('bunyan');

const logLevel = (() => {
  if (process.env.LOG_LEVEL) return process.env.LOG_LEVEL;
  return process.env.NODE_ENV === 'produciton' ? 'info' : 'debug';
})();

const logger = bunyan.createLogger({
  name: 'app-logger',
  serializers: bunyan.stdSerializers,
  level: logLevel
});

const middleware = (req, res, next) => {
  logger.info({ req });
  next();
};

module.exports = { logger, middleware };
