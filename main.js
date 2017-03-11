var Hapi = require('hapi');
var server = new Hapi.Server(process.env.PORT || 3000);

var dbOpts = {
    url: 'mongodb://hapi:hapi@ds121980.mlab.com:21980/heroku_6kdqrqg7'
}

server.register({
    register: require('hapi-mongodb'),
    options: dbOpts
}, function(err) {
    if(err) {
        console.error(err);
        throw err;
    }
});

// server.route( {
//     method: 'GET',
//     path: '/temp/',
//     handler(request, reply) {
//         const db = request.mongo.db;
//         db.collection('temperature').find({} , function (err, result) {
//             if (err) {
//                 return reply(Boom.internal('Internal MongoDB error', err));
//             }
//             reply(result);
//         });
//     }
// });

server.start(function () {
    console.log('Server started at [' + server.info.uri + ']');
});
