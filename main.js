'use strict';

const Hapi = require('hapi');
const mongojs = require('mongojs');

var port = process.env.PORT || 3000;

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: port
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