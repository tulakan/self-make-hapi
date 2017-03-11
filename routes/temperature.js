'use strict';

const Boom = require('boom');
const uuid = require('node-uuid');
const Joi = require('joi');
const mongojs = require('mongojs');

exports.register = function(server, options, next) {

    const db = server.app.db;

    server.route({
        method: 'GET',
        path: '/temp/list',
        handler: function (request, reply) {
            db.Temperatures.find((err, docs) => {
                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                reply(docs);
            });

        }
    });

    server.route({

        method: 'POST',
        path: '/temp/create',
        handler: function (request, reply) {

            const tempe = request.payload;
            tempe.timestamp = new Date();


            //Create an id
            //tempe._id = uuid.v1();

            db.Temperatures.save(tempe, (err, result) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }


                reply(result);
            });
        }
    });

    server.route({
        method: 'POST',
        path: '/temp/update',
        handler: function (request, reply) {

            var item = request.payload;
            var id = mongojs.ObjectId(item._id.$oid);
            delete item._id;

            db.Temperatures.update({
                _id: id
            }, {
                $set: item
            }, function (err, result) {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                if (result.n === 0) {
                    return reply(Boom.notFound());
                }
                reply({
                    "statusCode": 200,
                    "message": "Successfully Updated.",
                    "data": item
                });
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/temp/show/{id}',
        handler: function (request, reply) {
            
                var id = mongojs.ObjectId(request.params.id);

                db.Temperatures.find({
                    _id: id
                }, function (err, result) {
                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                reply(result);
            });

        }
    });

    server.route({
        method: 'GET',
        path: '/temp/latest',
        handler: function (request, reply) {

            // db.Temperatures.find.sort( [['_id', -1]]).limit(1
            db.Temperatures.find().limit(1).sort({'timestamp': -1},
                function (err, result) {
                     if (err) {
                         return reply(Boom.wrap(err, 'Internal MongoDB error'));
                     }

                     reply(result);

                 });
        }
    });

    return next();

};

exports.register.attributes = {
    name: 'routes-temperatures'
};

