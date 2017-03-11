'use strict';

const Hapi = require('hapi');
const mongojs = require('mongojs');

// Create a server with a host and port
// For Dev on localhost
var port = process.env.PORT || 3000;
const server = new Hapi.Server();
server.connection({
    port: port
});

// For Server Deploy
// var server = new Hapi.Server(process.env.PORT || 3000);

//Connect to db
server.app.db = mongojs('mongodb://hapi:hapi@ds121980.mlab.com:21980/heroku_6kdqrqg7', ['Temperatures']);

//Load plugins and start server
server.register([
    require('./routes/temperature'),
    require('./routes/uploadFiles'),
    require('inert')
], (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/linebot',
        handler: {
            file: {
                path: 'bot.php',
                mode: 'attachment'
            }
        }
    });


    // Start the server
    server.start((err) => {
        console.log('Server running at:', server.info.uri);
    });

});