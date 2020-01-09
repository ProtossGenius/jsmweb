var path = require('path');
var fs = require('fs');
var url = require('url');

class Route {
    //readablePath use relative path, all the resource file should in this path. (only in this path can be file system read..).
    constructor(readablePath, jsoBase, htmlPath) {
        this.readablePath = path.resolve(readablePath);
        this.jsoBase = path.resolve(jsoBase);
        if (!htmlPath) {
            htmlPath = readablePath;
        }
        this.htmlPath = htmlPath;
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
        // 从文件系统中读取请求的文件内容
        fs.readFile(filepath, function (err, data) {
            if (err) {
                return false;
            }
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(data.toString());
            response.end();
        });
        return true;
    }
    onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        if(pathname.startsWith("js/")){
            pathname = pathname.substr(3);
        } else if (this.jsoPage[pathname]) {
            this.jsoPage[pathname](request, response);
            response.end();
            return true;
        } else {
            var filePath = this.htmlPath + pathname;
            if(!this.canRead(filePath)){
                return false;
            }
            return this.fileRequest(filePath, request, response);
        }
        return false;
    }

}

module.exports = {
    Route: Route,
}