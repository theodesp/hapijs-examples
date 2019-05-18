'use strict';

const Hapi = require('@hapi/hapi');
const Boom = require('boom');

// Config
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 3001
});


// Routes
server.route({
  method: 'GET',
  path: '/1',
  handler: function (request, reply) {
    reply(Boom.badRequest('something', { stuff: 'and more' }));
  } 
})
// Routes
server.route({
  method: 'GET',
  path: '/2',
  handler: function (request, reply) {
    reply(Boom.gatewayTimeout());
  } 
})
// Routes
server.route({
  method: 'GET',
  path: '/3',
  handler: function (request, reply) {
    reply(Boom.serverUnavailable('unavailable'));
  } 
})



// Start
server.start((err) => {
  if (err) {
    console.error(err);
    throw err;
  }

  console.info('Server running at:', server.info.uri);
});
