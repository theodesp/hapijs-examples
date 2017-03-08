'use strict';

const Hapi = require('hapi');

// Config
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 3001
});

// Cookie
server.state('data', {
    ttl: null,
    isSecure: true,
    isHttpOnly: true,
    encoding: 'base64json',
    clearInvalid: false, // remove invalid cookies
    strictHeader: true // don't allow violations of RFC 6265
});


// Routes
server.route({
  method: 'GET',
  path: '/{name}',
  handler: function (request, reply) {
    return reply('Hello ' + encodeURIComponent(request.params.name) + '!').state('data', { firstVisit: false });
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
