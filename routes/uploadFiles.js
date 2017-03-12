'use strict';

const Boom = require('boom');
const uuid = require('node-uuid');
const Joi = require('joi');
const mongojs = require('mongojs');

exports.register = function(server, options, next) {

    const db = server.app.db;

    server.route({
        method: 'POST',
        path: '/uploadfiles',
        config: {
            payload: {
                maxBytes: 209715200,
                output: 'stream',
                parse: false
            },
    
    
            handler: function(request, reply) {
                var multiparty = require('multiparty');
                var form = new multiparty.Form();
                form.parse(request.payload, function(err, fields, files) {
                    console.log(err);
                    console.log(fields);
                    console.log(files);
                });

                reply(result);
    
            }
        }
    });

    
    
    return next();
};

exports.register.attributes = {
    name: 'routes-uploadfiles'
};

