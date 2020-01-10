var wo = require('./webobj');

function div(sons, attrib){
    return new wobj("div", sons, attrib);
}

function meta(sons, attrib){
    return new wobj("meta", sons, attrib);
}

function html(sons, attrib){
    return new wobj("html", sons, attrib);
}

function body(sons, attrib){
    return new wobj("body", sons, attrib);
}

function head(sons, attrib){
    return new wobj("head", sons, attrib);
}

function h1(sons, attrib){
    return new wobj("h1", sons, attrib);
}

function h2(sons, attrib){
    return new wobj("h2", sons, attrib);
}

function h3(sons, attrib){
    return new wobj("h3", sons, attrib);
}

function ul(sons, attrib){
    return new wobj("ul", sons, attrib);
}

function li(sons, attrib){
    return new wobj("li", sons, attrib);
}

function a(sons, attrib){
    return new wobj("a", sons, attrib);
}

function span(sons, attrib){
    return new wobj("span", sons, attrib);
}

function p(sons, attrib){
    return new wobj("p", sons, attrib);
}

function script(sons, attrib){
    return new wobj("script", sons, attrib);
}

function table(sons, attrib){
    return new wobj("table", sons, attrib);
}

function tr(sons, attrib){
    return new wobj("tr", sons, attrib);
}

function td(sons, attrib){
    return new wobj("td", sons, attrib);
}

function th(sons, attrib){
    return new wobj("th", sons, attrib);
}

function marquee(sons, attrib){
    return new wobj("marquee", sons, attrib);
}

function label(sons, attrib){
    return new wobj("label", sons, attrib);
}

function input(sons, attrib){
    return new wobj("input", sons, attrib);
}

function select(sons, attrib){
    return new wobj("select", sons, attrib);
}

function testarea(sons, attrib){
    return new wobj("testarea", sons, attrib);
}

function button(sons, attrib){
    return new wobj("button", sons, attrib);
}

function required(sons, attrib){
    return new wobj("required", sons, attrib);
}

function title(sons, attrib){
    return new wobj("title", sons, attrib);
}
module.exports = {
title:title,
div:div,
head:head,
span:span,
button:button,
select:select,
ul:ul,
li:li,
table:table,
tr:tr,
p:p,
td:td,
th:th,
marquee:marquee,
html:html,
body:body,
h1:h1,
a:a,
required:required,
label:label,
input:input,
testarea:testarea,
meta:meta,
h2:h2,
h3:h3,
script:script,
};
