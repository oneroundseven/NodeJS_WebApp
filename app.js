var config = require('./setting'),
    MIME = require('./MIME'),
    http = require('http'),
    fs = require('fs'),
    url = require('url'),
    path = require('path');

console.log('Server initialize!');

var server = http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    var ext = path.extname(pathname);
    ext = ext ? ext.slice(1) : 'unknown';

    console.log(ext);
/*    path.exists(pathname, function(exists) {
        console.log(exists)
        if (!exists) {
            response.writeHead(404, { 'Content-Type':'text/plain' });
            response.write('This request URL'+ pathname +'was not found on this server.');
            response.end();
        } else {

            fs.readFile(pathname, "binary", function(err, file) {
                if (err) {
                    response.writeHead(500, { 'Content-Type':'text/plain' });
                    response.end(err);
                } else {
                    response.writeHead(200, { 'Content-Type': MIME[ext] });
                    response.end(file);
                }
            })
        }
    });*/
});

server.listen(config.PORT);

console.log('Server runing at port:'+ config.PORT);