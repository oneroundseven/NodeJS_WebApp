module.exports = {
    '/' : {
        server : '/server/index/index.js',
        render : '/view/index/index.ejs'
    },
    '/error/404.html' : {
        server : '/server/err/404.js',
        render : '/view/err/404.ejs'
    },
    '/error/500.html' : {
        server : '/server/err/500.js',
        render : '/view/err/500.ejs'
    }
}