'use strict';
// Load modules

const Hapi = require('@hapi/hapi');
const Inert = require('inert');
const Vision = require('vision');
const Tv = require('tv');

// Declare internals

const internals = {};

internals.plugins = [Vision, Inert, Tv];

const server = new Hapi.Server();

server.connection({ port: 3001 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        return reply('1');
    }
});


server.register(internals.plugins, (err) => {

    if (err) {
        console.log(err);
        throw err;
    }

    server.start((err) => {

        if (err) {
            console.log(err);
            throw err;
        }
        console.log('Server started at: ' + server.info.uri);
    });
});
