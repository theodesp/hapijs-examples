'use strict';

const Hapi = require('@hapi/hapi');
const Nes = require('nes');
const Path = require('path');
const Inert = require('inert');

// Config
const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, '../public')
      }
    }
  }
});
server.connection({
  host: 'localhost',
  port: 3001
});

// Static file server
server.register(Inert, () => { });

// Routes
server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: '../public',
      redirectToSlash: true,
      index: true
    }
  }
});

server.register(Nes, function (err) {

  server.route({
    method: 'GET',
    path: '/h',
    config: {
      id: 'hello',
      handler: function (request, reply) {

        return reply('world!');
      }
    }
  });

  server.subscription('/item/{id}');

  // Start
  server.start((err) => {
    if (err) {
      console.error(err);
      throw err;
    }

    setTimeout(function() {
      server.publish('/item/5', { id: 5, status: 'complete' });
      server.publish('/item/6', { id: 6, status: 'initial' });
    }, 5000);

    console.info('Server running at:', server.info.uri);
  });
});


