'use strict';

module.exports.register = (server, serviceLocator) => {

  server.post(
    {
      path: '/users',
      name: 'Create User',
      version: '1.0.0',
      validation: {
        body: require('../validations/create_user')
      }
    },
    (req, res, next) =>
      serviceLocator.get('userController').create(req, res, next)
  );

  server.get(
    {
      path: '/users/:username',
      name: 'Get User',
      version: '1.0.0',
      validation: {
        params: require('../validations/get_birthdates-user.js')
      }
    },
    (req, res, next) =>
      serviceLocator.get('userController').get(req, res, next)
  );

  server.get(
    {
      path: '/birthdates/:username',
      name: 'Get Birthdates',
      version: '1.0.0',
      validation: {
        params: require('../validations/get_birthdates-user.js')
      }
    },
    (req, res, next) =>
      serviceLocator.get('birthdateController').listAll(req, res, next)
  );

  server.post(
    {
      path: '/birthdates/:username',
      name: 'Create Birthdate',
      version: '1.0.0',
      validation: {
        body: require('../validations/create_birthdates')
      }
    },
    (req, res, next) =>
      serviceLocator.get('birthdateController').create(req, res, next)
  );
};
