var http = require('http');
var routes = require('./web_func/routes');
// 创建服务器

var route = new routes.Route("./web", "./jspage", "./web");

http.createServer(function (request, response) {
    if (!route.onRequest(request, response)) {
        route.fileRequest("./web/404.html", request, response);
    }
}).listen(800);


// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:800/');
