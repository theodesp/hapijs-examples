'use strict';

const Hapi = require('@hapi/hapi');
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
server.register(Inert, () => {});

// Routes
server.route({
  method: 'GET',
  path: '/{name}',
  handler: {
    file: '../public/index.html'
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
