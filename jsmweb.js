var http = require('http');
var routes = require('./web_func/routes');
// ����������

var route = new routes.Route("./web", "./jspage", "./web");

http.createServer(function (request, response) {
    if (!route.onRequest(request, response)) {
        route.fileRequest("./web/404.html", request, response);
    }
}).listen(800);


// ����̨�����������Ϣ
console.log('Server running at http://127.0.0.1:800/');
