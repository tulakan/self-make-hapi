var Hapi = rquire('hapi');
var server = new Hapi.Server(process.env.PORT || 3000);
server.start(function () {
    console.log('Server started at [' + server.info.uri + ']');
});