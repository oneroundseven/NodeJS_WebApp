var ejs = require('ejs'),
    fs = require('fs'),
    path = '../view/index.ejs',
    str = fs.readFileSync(path, 'utf8');

var ret = ejs.render(str, {
    content: 'hello',
    filename: path
});

console.log(ret);