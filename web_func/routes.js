var path = require('path');
var fs = require('fs');
var url = require('url');
String.prototype.endWith = function (endStr) {
    var d = this.length - endStr.length;
    return (d >= 0 && this.lastIndexOf(endStr) == d);
}

class Route {
    //readablePath use relative path, all the resource file should in this path. (only in this path can be file system read..).
    constructor(readablePath, jsoBase) {
        this.readablePath = path.resolve(readablePath);
        this.jsoBase = path.resolve(jsoBase);
        this.jsoPage = {};
        this.initJsoPage(jsoBase);
        if (this.jsoPage["/index"]) {
            this.jsoPage["/"] = this.jsoPage["/index"];
        }
    }

    initJsoPage(jsoPath) {
        jsoPath = path.resolve(jsoPath);
        var pa = fs.readdirSync(jsoPath);
        var jsoBase = this.jsoBase;
        var jsoPage = this.jsoPage;
        pa.forEach(function (ele) {
            var info = fs.statSync(jsoPath + "/" + ele);
            if (info.isDirectory()) {
                readDirSync(jsoPath + path.sep + ele);
            } else {
                if (path.extname(ele) == ".js") {
                    var url = jsoPath.substr(jsoBase.length) + "/" + ele.substr(0, ele.length - 3);
                    url.replace("\\", "/");
                    jsoPage[url] = require(jsoPath + path.sep + ele).getPage;
                }
            }
        })
    }

    canRead(filePath) {
        filePath = path.resolve(filePath);
        //if not in  readablePath
        if (path.resolve(filePath).indexOf(this.readablePath) != 0) {
            return false;
        }
        if (filePath[this.readablePath.length] != path.sep) {
            return false;
        }
        return fs.existsSync(filePath);
    }

    fileRequest(filepath, request, response) {
        if (!this.canRead(filepath)) {
            return false;
        }
        // 从文件系统中读取请求的文件内容
        fs.readFile(filepath, function (err, data) {
            if (err) {
                console.log("Error when fileRequest filePath:", filepath, ", error : ", err);
                return ;
            }
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(data.toString());
            response.end();
        });
        return true;
    }

    onReq(request, response){
        var pathname = url.parse(request.url).pathname;
        if (this.jsoPage[pathname]) {
            this.jsoPage[pathname](request, response);
            response.end();
            return true;
        } else if (pathname.endWith(".js")) {
            return this.fileRequest(this.readablePath + "/js/" + pathname, request, response);
        } else if (pathname.endWith(".css")) {
            return this.fileRequest(this.readablePath + "/css/" + pathname, request, response);
        } else {
            if (pathname == "/"){
                pathname = "/index.html"
            }
            return this.fileRequest(this.readablePath + "/html/" + pathname, request, response);
        }
        return false;
    }

    onRequest(request, response) {
        if(!this.onReq(request, response)){
            this.p404(request, response)
        }
    }

    p404(request, response){
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.end();
    }

}

module.exports = {
    Route: Route,
}