'use strict';

const Hapi = require('@hapi/hapi');
const CatboxRedis = require('catbox-redis');

// Config
const server = new Hapi.Server({
  cache: [
    {
      name: 'redisCache',
      engine: CatboxRedis,
      host: '127.0.0.1',
      partition: 'cache'
    }
  ]
});
server.connection({
  host: 'localhost',
  port: 3001
});

// Server methods
const add = function (a, b, next) {
  return next(null, Number(a) + Number(b));
};

server.method('sum', add, {
  cache: {
    cache: 'redisCache',
    expiresIn: 30 * 1000,
    generateTimeout: 100
  }
});



// Routes
server.route({
  path: '/add/{a}/{b}',
  method: 'GET',
  handler: function (request, reply) {

    server.methods.sum(request.params.a, request.params.b, (err, result) => {

      if (err) {
        return reply(err);
      }
      reply(result);
    });
  }
});

server.route({
    path: '/addLast/{a}/{b}',
    method: 'GET',
    handler: function (request, reply) {

        server.methods.sum(request.params.a, request.params.b, (err, result, cached, report) => {

            if (err) {
                return reply(err);
            }
            const lastModified = cached ? new Date(cached.stored) : new Date();
            return reply(result).header('last-modified', lastModified.toUTCString());
        });
    }
});

server.route({
  method: 'GET',
  path: '/{name}',
  handler: function (request, reply) {
    return reply('Hello ' + encodeURIComponent(request.params.name) + '!')
      .etag('11-22-33');
  },
  config: {
    cache: {
      expiresIn: 30 * 1000,
      privacy: 'private'
    }
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
