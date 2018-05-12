'use strict';

require('dotenv').config();
const config = require('./app/configs/configs')();
const restify = require('restify');
const versioning = require('restify-url-semver');

// Initialize and configure restify server
const server = restify.createServer({
  name: config.app.name,
  versions: ['1.0.0'],
  formatters: {
    'application/json': require('./app/lib/jsend')
  }
});

// Set API versioning and allow trailing slashes
server.pre(restify.pre.sanitizePath());
server.pre(versioning({prefix: '/'}));

// Set request handling and parsing
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(
  restify.plugins.bodyParser({
    mapParams: false
  })
);

// start server
server.listen(config.app.port, () => {
  console.log(`${config.app.name} Server is running on port - 
    ${config.app.port}`);
});
