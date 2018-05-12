'use strict';

const serviceLocator = require('../lib/service_locator');
const config = require('./configs')();

serviceLocator.register('logger', () => {
  return require('../lib/logger').create(config.application_logging);
});

serviceLocator.register('httpStatus', () => {
  return require('http-status');
});

serviceLocator.register('mongoose', () => {
  return require('mongoose');
});

serviceLocator.register('errs', () => {
  return require('restify-errors');
});

serviceLocator.register('birthdateService', (serviceLocator) => {
  const log = serviceLocator.get('logger');
  const mongoose = serviceLocator.get('mongoose');
  const httpStatus = serviceLocator.get('httpStatus');
  const errs = serviceLocator.get('errs');
  const BirthdateService = require('../services/birthdates');

  return new BirthdateService(log, mongoose, httpStatus, errs);
});

serviceLocator.register('userService', (serviceLocator) => {
  const log = serviceLocator.get('logger');
  const mongoose = serviceLocator.get('mongoose');
  const httpStatus = serviceLocator.get('httpStatus');
  const errs = serviceLocator.get('errs');
  const UserService = require('../services/user');

  return new UserService(log, mongoose, httpStatus, errs);
});

serviceLocator.register('birthdateController', (serviceLocator) => {
  const log = serviceLocator.get('logger');
  const httpStatus = serviceLocator.get('httpStatus');
  const birthdateService = serviceLocator.get('birthdateService');
  const BirthdateController = require('../controllers/birthdates');

  return new BirthdateController(log, birthdateService, httpStatus);
});

serviceLocator.register('userController', (serviceLocator) => {
  const log = serviceLocator.get('logger');
  const httpStatus = serviceLocator.get('httpStatus');
  const userService = serviceLocator.get('userService');
  const UserController = require('../controllers/user');

  return new UserController(log, userService, httpStatus);
});

module.exports = serviceLocator;
