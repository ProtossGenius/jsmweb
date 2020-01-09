class wobj {
    constructor(type, sons, attrib) {
        this.type = type;
        this.sons = sons;
        this.attrib = attrib;
    }

    toxml(p, idxMap, start) {
        if (idxMap == null){
            idxMap = {};
        }
        if (p == null){
            p = "";
        }
        var idx = Object.keys(idxMap).length;
        if(start != null && start > idx){
            idx = start;
        }
        var res = "<" + this.type + " id=\"" + idx + "\" idpth=\"" + p + "\"";
        idxMap[p] = idx;

        for (p in this.attrib) {
            res += (" " + p + "=\"" + this.attrib[p] + "\"");
        }
        res += ">";
        if (this.sons != null) {
            if ("string" == typeof this.sons){
                res += this.sons;
            }else {
                this.sons.forEach(function (v, i) {
                    if ("string" == typeof v) {
                        res += v;
                    } else if (v instanceof wobj) {
                        res += v.toxml(p + "." + i, idxMap);
                    } else {
                        res += v;
                    }
                });
            }
        }
        return res + "</" + this.type + ">";
    }
}

var $ = {};
$.expand = function (a, b) {
    for (p in b) {
        a[p] = b[p];
    }
};

$.expand(global, {
    $:$,
    wobj: wobj,
});