'use strict';

const Hapi = require('@hapi/hapi');

// Config
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 3001
});


// Routes
server.route({
  method: 'GET',
  path: '/{name}',
  handler: function (request, reply) {
    return reply('Hello ' + encodeURIComponent(request.params.name) + '!');
  }
})

// Plugin

const myPlugin = {
  register: function (server, options, next) {
    server.route({
      method: 'GET',
      path: '/test',
      handler: function (request, reply) {
        reply('test passed');
      }
    });
    next();
  }
};

myPlugin.register.attributes = {
  name: 'myPlugin',
  version: '1.0.0'
};


server.register({ register: myPlugin }, {
  routes: {
    prefix: '/plugins'
  }
}, (err) => {

  if (err) {
    throw err;
  }

  // Start
  server.start((err) => {
    if (err) {
      console.error(err);
      throw err;
    }

    console.info('Server running at:', server.info.uri);
  });
});

