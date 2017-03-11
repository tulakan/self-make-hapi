'use strict';

const Boom = require('boom');
const uuid = require('node-uuid');
const Joi = require('joi');
const mongojs = require('mongojs');

var uploadFilesService = {
    fs : require('fs'),
    multiparty: require('multiparty'),
    uploadFiles:function(req,reply){
        var form = new uploadFilesService.multiparty.Form();
        var dt = new Date();
        form.parse(req.payload, function(err, fields, files) {
            uploadFilesService.fs.readFile(files.upload[0].path,function(err,data){
                var newpath = __dirname + "/assets/" + dt.getTime() + "_" + files.upload[0].originalFilename;
                uploadFilesService.fs.writeFile(newpath,data,function(err){
                    if(err) console.log(err);
                    else console.log(files)
                })
            });
            console.log(files)
        });
    }
}

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
            handler: uploadFilesService.uploadFiles
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'routes-uploadfiles'
};

