
var ejs = require('ejs'),
    fs = require('fs'),
    path = null,
    str = fs.readFileSync(path, 'utf8');

var ret = ejs.render(str, {
    content: 'hello',
    filename: path
});

function render(path) {

}

module.exports = function() {}