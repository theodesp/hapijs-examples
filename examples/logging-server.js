'use strict';

const Hapi = require('hapi');
const Good = require('good');

// Config
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 3001
});

// Logging
const loggingOptions = {
  ops: {
    interval: 1000
  },
  reporters: {
    myConsoleReporter: [{ // Report to console
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{ log: '*', response: '*' }]
    }, {
      module: 'good-console'
    }, 'stdout'],
    myFileReporter: [{ // Report to file
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{ ops: '*' }]
    }, {
      module: 'good-squeeze',
      name: 'SafeJson'
    }, {
      module: 'good-file',
      args: ['./test/fixtures/awesome_log']
    }]
    // }],
    // myHTTPReporter: [{ // Http
    //     module: 'good-squeeze',
    //     name: 'Squeeze',
    //     args: [{ error: '*' }]
    // }, {
    //     module: 'good-http',
    //     args: ['http://prod.logs:3000', {
    //         wreck: {
    //             headers: { 'x-api-key': 12345 }
    //         }
    //     }]
    // }]
  }
};


// Routes
server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello, world!');
  }
});

server.route({
  method: 'GET',
  path: '/{name}',
  handler: function (request, reply) {
    return reply('Hello ' + encodeURIComponent(request.params.name) + '!');
  }
})


server.register({
  register: Good,
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          response: '*',
          log: '*'
        }]
      }, {
        module: 'good-console'
      }, 'stdout'],
      file: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ ops: '*' }]
      }, {
        module: 'good-squeeze',
        name: 'SafeJson'
      }, {
        module: 'good-file',
        args: ['./test/fixtures/awesome_log']
      }],
    }
  }
}, (err) => {

  if (err) {
    throw err; // something bad happened loading the plugin
  }

  server.start((err) => {

    if (err) {
      throw err;
    }
    server.log('info', 'Server running at: ' + server.info.uri);
  });
});
