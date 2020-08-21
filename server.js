var http = require('http');
var fs = require('fs');
var url = require('url');
var port = 1337;
var domain_def = 'index.html';

// ����������
http.createServer(function (request, response) {
    // �������󣬰����ļ���
    var pathname = url.parse(request.url).pathname;

    // ���������ļ���
    console.log("Request for " + pathname + " received.");
    function a(s) {
        fs.readFile(s.substr(1), function (err, data, str=s) {
            if (err) {
                console.log(err);
                // HTTP ״̬��: 404 : NOT FOUND
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
                // HTTP ״̬��: 200 : OK
                // Content Type: text/html
                response.writeHead(200, { 'Content-Type': 'text/html' });

                // ��Ӧ�ļ�����
                response.write(data.toString());
            }
            //  ������Ӧ����
            response.end();
        });
    }
    // ���ļ�ϵͳ�ж�ȡ������ļ�����
    if (pathname == '/' || pathname == '') {
        a('/' + domain_def);
    }
    else {
        a(pathname);
    }
    
}).listen(port);

// ����̨�����������Ϣ
console.log('Server running');