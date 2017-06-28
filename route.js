// Copyright 2014 FOCUS Inc.All Rights Reserved.

/**
 * @fileOverview Probe
 * @author sheny@made-in-china.com
 */

var urlStatic = require('./urlStatic'),
    path = require('path'),
    queryString = require('querystring'),
    url = require('url'),
    log = require('./modules/log'),
    filter;

function route(pathName, request, response) {
    var mapping = getMapping(pathName),
        isAjax = (request.headers['x-requested-with'] === 'XMLHttpRequest');

    try {
        if (!mapping) {
            if (isAjax) {
                response.writeHead(404, {
                    "Content-Type" : 'text/html'
                })
            } else {
                response.writeHead(302, {
                    Location : '/error/404.html'
                });
            }
            response.end();
        } else {
            parameter(request, function(params) {
                request['params'] = params || {};

                response.writeHead(200, {"Content-Type":'text/html;charset:utf-8'});
                filter = require('.'+ mapping.server);
                filter.renderPage(request, response, path.join(__dirname, (mapping.render ? mapping.render : '')), function(content) {
                    response.write(content);
                    response.end();
                });
            });
        }
    } catch(err) {
        log.info('500 ERROR:'+ err);
        if (isAjax) {
            response.writeHead(500, {
                "Content-Type" : 'text/html'
            });
            response.write(err.toString());
        } else {
            response.writeHead(302, {
                Location : '/error/500.html'
            });
        }
        response.end();
    }
}

function getMapping(pathName) {
    if (!pathName) return null;

    if (urlStatic[pathName]) {
        return urlStatic[pathName];
    }

    for (var path in urlStatic) {
        if (urlStatic[path].reg) {
            if (new RegExp(urlStatic[path].reg).test(pathName)) {
                return urlStatic[path];
            }
        }
    }

    return null;
}

function parameter(request, callback) {
    if (request.method.toLowerCase() === 'post') {
        var receiveData = '';
        request.setEncoding("utf8");
        request.addListener("data", function (postDataChunk) {
            receiveData += postDataChunk;
        }).addListener('end', function() {
            callback(queryString.parse(receiveData));
        });
    } else {
        callback(url.parse(request.url, true).query);
    }
}


module.exports = route;