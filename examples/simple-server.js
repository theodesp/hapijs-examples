'use strict';

const Hapi = require('hapi');

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



// Start
server.start((err) => {
  if (err) {
    console.error(err);
    throw err;
  }

  console.info('Server running at:', server.info.uri);
});
