'use strict';

const Hapi = require('hapi');
const Hoek = require('hoek');
const Vision = require('vision');
const Handlebars = require('handlebars');

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

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply.view('index', { title: 'My home page is this one', message: 'Handlebars message accepted' });
  }
});


server.register(Vision, (err) => {

  Hoek.assert(!err, err);

  server.views({
    engines: {
      'html': {
        module: Handlebars,
        compileMode: 'sync' // engine specific
      }
    },
    relativeTo: __dirname,
    path: '../public/templates'
  });

});

server.start((err) => {

  if (err) {
    throw err;
  }
  server.log('info', 'Server running at: ' + server.info.uri);
});
