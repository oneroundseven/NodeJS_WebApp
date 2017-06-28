// Copyright 2014 FOCUS Inc.All Rights Reserved.

/**
 * @fileOverview Probe
 * @author sheny@made-in-china.com
 */
var ejs = require('ejs'),
    fs = require('fs');

module.exports = {
    renderPage : function(request, response, filedir, render) {
        render(ejs.render(fs.readFileSync(filedir, 'utf8'), {
            content: '500',
            filename: filedir
        }));
    }
}