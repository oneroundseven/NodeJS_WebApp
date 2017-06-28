// Copyright 2017 FOCUS Inc.All Rights Reserved.

/**
 * @fileOverview NodeJS_WebApp
 * @author sheny@made-in-china.com
 */

var http = require("http"),
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    setting = require('./setting'),
    route = require('./route'),
    log = require('./modules/log'),
    urlStatic = require('./urlStatic'),
    MIME = require('./MIME');

function service() {
    http.createServer(function(request, response) {
        var pathname = url.parse(request.url).pathname;
        var ext = path.extname(pathname).substring(1);

        if (!MIME[ext] && pathname.indexOf('/') === -1) {
            log.info('Unrecognized MIME type : '+ ext);
        }

        if (MIME[ext]) {
            fs.exists("."+pathname, function(exists) {
                if (exists) {
                    fs.readFile("."+pathname, function (err, data) {//读取内容
                        if (err) throw err;
                        response.writeHead(200, {
                            "Content-Type": MIME[ext]
                        });
                        response.write(data);
                        response.end();
                    });
                } else {
                    if (!urlStatic[pathname]) {
                        log.info('404 : '+ pathname);
                        response.writeHead(302, {
                            Location : '/error/404.html'
                        });
                    } else {
                        route(pathname, request, response);
                    }
                }
            });
        } else {
            //response.setHeader("Access-Control-Allow-Origin", "http://192.168.28.137:9100");
            route(pathname, request, response);
        }
    }).listen(setting.host);
    console.log('server start at localhost:'+ setting.host);
}

exports.start = service;