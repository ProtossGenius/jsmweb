class wobj {
    constructor(type, sons, attrib) {
        this.type = type;
        this.sons = sons;
        this.attribs = attrib;
    }

    idMap(p, start, idxMap) {
        if (idxMap == null) {
            idxMap = {};
        }
        if (p == null) {
            p = "";
        }
        var idx = Object.keys(idxMap).length;
        if (start != null && start > idx) {
            idx = start;
        }
        idxMap[p] = idx;
        if (this.sons != null) {
            if (this.sons instanceof wobj) {
                this.sons.idMap(p+".0", idx+1, idxMap);
            } else {
                for (var i in this.sons) {
                    var v = this.sons[i];
                    if (v instanceof wobj) {
                        v.idMap(p+"."+i, idx+1, idxMap);
                    }
                }
            }
        }
        return idxMap;
    }

    toxml(idxMap, p, deep, start) {
        if (idxMap == null) {
            idxMap = {};
        }
        if (p == null) {
            p = "";
        }
        if (deep == null) {
            deep = 0;
        }
        var idx = Object.keys(idxMap).length;
        if (start != null && start > idx) {
            idx = start;
        }
        var space = "";
        for (var i = 0; i < deep; i++) {
            space += "\t";
        }
        var res = "\n" + space + "<" + this.type + " id=\"" + idx + "\"" /*+ " idpth=\"" + p + "\""*/;
        idxMap[p] = idx;

        for (var attr in this.attribs) {
            res += (" " + attr + "=\"" + this.attribs[attr] + "\"");
        }
        res += ">";
        var nlFlag = false;
        if (this.sons != null) {
            if ("string" == typeof this.sons) {
                res += this.sons;
            } else if (this.sons instanceof wobj) {
                nlFlag = true;
                res += this.sons.toxml(idxMap, p + ".0", deep + 1, idx + 1);
            } else {
                nlFlag = true;
                for (var i in this.sons) {
                    var v = this.sons[i];
                    if ("string" == typeof v) {
                        res += v;
                    } else if (v instanceof wobj) {
                        res += v.toxml(idxMap, p + "." + i, deep + 1, idx + 1);
                    } else {
                        res += v;
                    }
                }
            }
        }
        if (nlFlag) {
            space = "\n" + space;
        } else {
            space = "";
        }
        return res + space + "</" + this.type + ">";
    }
}

var $ = {};
$.expand = function (a, b) {
    for (p in b) {
        a[p] = b[p];
    }
};

$.expand(global, {
    $: $,
    wobj: wobj,
});