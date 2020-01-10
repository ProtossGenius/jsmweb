var wc = require('./webobj/webctrl');

var head = wc.head([
    wc.div(),//0
    wc.body(//1
        wc.a({test: wc.div("for")}, {herf: "baidu.com"})
    )]);
var mmp = {};
console.log(head.toxml(mmp));