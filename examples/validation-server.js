'use strict';

const Hapi = require('@hapi/hapi');
const Joi = require('joi');

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
  },
  config: {
    validate: {
      params: {
        name: Joi.string().min(3).max(10)
      }
    }
  }
})

server.route({
    method: 'GET',
    path: '/list',
    handler: function (request, reply) {
        reply([1,2,3].slice(0, request.query.limit));
    },
    config: {
        validate: {
            query: {
                limit: Joi.number().integer().min(1).max(100).default(10)
            }
        }
    }
});



// Start
server.start((err) => {
  if (err) {
    console.error(err);
    throw err;
  }

  console.info('Server running at:', server.info.uri);
});
