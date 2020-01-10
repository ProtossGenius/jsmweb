var wc = require('../webobj/webctrl');

var head = wc.html([
    wc.head([wc.meta(null, {charset:"utf-8"}), wc.title("title")]),//0
    wc.body(//1
        [wc.h1("my first title"),wc.p("my first js html"), "hellohahahahah哈哈哈"])
    ]);
var mmp = {};
var p = head.toxml(mmp);


module.exports.getPage = function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n" +
        "\n" +
        "<html xmlns=\"http://www.w3.org/1999/xhtml\">\n");
    response.write(p);
};