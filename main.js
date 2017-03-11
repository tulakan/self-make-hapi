'use strict';

const Hapi = require('hapi');
const mongojs = require('mongojs');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: process.env.PORT || 3000
});

//Connect to db
server.app.db = mongojs('mongodb://hapi:hapi@ds121980.mlab.com:21980/heroku_6kdqrqg7', ['temperature']);

//Load plugins and start server
server.register([
    require('./routes/temperature')
], (err) => {

    if (err) {
        throw err;
    }

    // Start the server
    server.start((err) => {
        console.log('Server running at:', server.info.uri);
    });

});