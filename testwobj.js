var wc = require('./webobj/webctrl');

var head = wc.head([wc.div(), wc.body()]);
console.log(head.toxml());