'use strict';

const {createLogger, format, transports} = require('winston');
const {combine, timestamp, label, prettyPrint} = format;

const createTransports = function (config) {
  const customTransports = [];

  // setup the file transport
  if (config.file) {

    // setup the log transport
    customTransports.push(
      new transports.File({
        filename: config.file,
        level: config.level
      })
    );
  }

  // if config.console is set to true, a console logger will be included.
  if (config.console) {
    customTransports.push(
      new transports.Console({
        level: config.level
      })
    );
  }

  return customTransports;
};

module.exports = {
  create: function (config) {
    return new createLogger({
      transports: createTransports(config),
      format: combine(
        label({label: 'Birthdates API'}),
        timestamp(),
        prettyPrint()
      )
    });
  }
};
