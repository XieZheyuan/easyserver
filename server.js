var http = require('http');
var fs = require('fs');
var url = require('url');
var port = 1337;
var domain_def = 'index.html';

// 创建服务器
http.createServer(function (request, response) {
    // 解析请求，包括文件名
    var pathname = url.parse(request.url).pathname;

    // 输出请求的文件名
    console.log("Request for " + pathname + " received.");
    function a(s) {
        fs.readFile(s.substr(1), function (err, data, str=s) {
            if (err) {
                console.log(err);
                // HTTP 状态码: 404 : NOT FOUND
                // Content Type: text/html
                response.writeHead(404, { 'Content-Type': 'text/html' });
                var s = '<h1>404 Not Found ' + str + '</h1><hr /><p>Server:Node.js EasyServer</p>';
                fs.readFile("404.html", function (err, data) {
                    if (err) {

                    }
                    else {
                        s = data.toString();
                    }
                });
                response.write(s);
            } else {
                if (data.toString().length == 0) {
                    response.writeHead(204, { 'Content-Type': 'text/html' })
                }
                // HTTP 状态码: 200 : OK
                // Content Type: text/html
                response.writeHead(200, { 'Content-Type': 'text/html' });

                // 响应文件内容
                response.write(data.toString());
            }
            //  发送响应数据
            response.end();
        });
    }
    // 从文件系统中读取请求的文件内容
    if (pathname == '/' || pathname == '') {
        a('/' + domain_def);
    }
    else {
        a(pathname);
    }
    
}).listen(port);

// 控制台会输出以下信息
console.log('Server running');