var http = require('http');
var routes = require('./web_func/routes');
// ����������

var route = new routes.Route("./web", "./jspage");

route.p404 = function (request, response) {
    route.fileRequest("./web/html/404.html", request, response);
};

http.createServer(function (request, response){
    route.onRequest(request, response);
}).listen(800);


// ����̨�����������Ϣ
console.log('Server running at http://127.0.0.1:800/');
