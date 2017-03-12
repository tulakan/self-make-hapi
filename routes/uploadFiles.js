'use strict';

const Boom = require('boom');
const uuid = require('node-uuid');
const Joi = require('joi');
const mongojs = require('mongojs');

exports.register = function(server, options, next) {

    const db = server.app.db;

    // server.route({
    //     method: 'POST',
    //     path: '/uploadfiles',
    //     config: {
    //         payload: {
    //             maxBytes: 209715200,
    //             output: 'stream',
    //             parse: false
    //         },
    //
    //
    //         handler: function(request, reply) {
    //             var multiparty = require('multiparty');
    //             var form = new multiparty.Form();
    //             form.parse(request.payload, function(err, fields, files) {
    //                 console.log(err);
    //                 console.log(fields);
    //                 console.log(files);
    //             });
    //
    //         }
    //     }
    // });

    server.route({
        method: 'POST',
        path: '/convert',
        config: {
            payload: {
                output: 'file',
                maxBytes: 209715200,
                //allow: 'multipart/form-data',
                parse: true //or just remove this line since true is the default
            },
            handler:function (request, reply) {
                console.log('fileUpload path : ' + request.payload.fileUpload.path);
                reply({
                    "statusCode": 200,
                    "message": "Successfully Updated.",
                    "data": request.payload.fileUpload.path
                });
            }
        },
    });
    
    return next();
};

exports.register.attributes = {
    name: 'routes-uploadfiles'
};

