// Copyright 2017 FOCUS Inc.All Rights Reserved.

/**
 * @fileOverview NodeJS_WebApp
 * @author sheny@made-in-china.com
 */

// Copyright 2015 FOCUS Inc.All Rights Reserved.

/**
 * @fileOverview Probe
 * @author sheny@made-in-china.com
 */

var fs = require('fs'),
    settings = require('./../setting'),
    Promise = require('promise');

var log = {
    info : function(message) {
        var filePath = settings.logPath + '\\' + fsName() + '.txt';
        createLogFile(settings.logPath, 'path').then(function() {
            createLogFile(filePath, 'file').then(function() {
                fs.appendFile(filePath, formatMessage(message), function(err) {
                    if (err) throw err;
                })
            })
        })
    },
    warn : function(message) {
        var filePath = settings.logPath + '\\' + fsName() + '_warn.txt';
        createLogFile(settings.logPath, 'path').then(function() {
            createLogFile(filePath, 'file').then(function() {
                if (settings.debug) {
                    console.log(formatMessage(message));
                }
                fs.appendFile(filePath, formatMessage(message), function(err) {
                    if (err) throw err;
                })
            })
        })
    }
};

function formatMessage(msg) {
    return (global.IP ? (global.IP + ' ') : '') + formatDate('yyyy-MM-dd hh:mm:ss') + ' ' + msg + '\r\n';
}

function fsName() {
    var d = new Date();
    var m = d.getMonth() + 1;

    return d.getFullYear() + '_' + (m < 10 ? ('0' + m) : m) + '_' +
        (d.getDate() < 10 ? ('0'+ d.getDate()) : d.getDate());
}

function createLogFile(path, type) {
    return new Promise(function(resolve, reject) {
        fs.exists(path, function(isExist) {
            if (!isExist) {
                if (type === 'path') {
                    fs.mkdirSync(path);
                }
                if (type === 'file') {
                    fs.openSync(path, 'w');
                }
            }

            resolve();
        });
    });
}

function formatDate(fmt, dateStr) {
    var d = (dateStr ? new Date(dateStr) : new Date());
    var tmp = fmt;

    var o = {
        "M+": d.getMonth() + 1, //月份
        "d+": d.getDate(), //日
        "h+": d.getHours(), //小时
        "m+": d.getMinutes(), //分
        "s+": d.getSeconds(), //秒
        "q+": Math.floor((d.getMonth() + 3) / 3), //季度
        "S": d.getMilliseconds() //毫秒
    };

    if (/(y+)/.test(tmp)) tmp = tmp.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(tmp)) {
            tmp = tmp.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return tmp;
}

module.exports = log;