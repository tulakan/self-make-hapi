'use strict';

const Boom = require('boom');
const uuid = require('node-uuid');
const Joi = require('joi');

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

    return next();

};

exports.register.attributes = {
    name: 'routes-books'
};

