
var http = require('http');
require('./register.js');
var fs = require('fs');
var path = require('path');
const url = require('url');
const hostname = 'twserver.alunos.dcc.fc.up.pt';
const port = 9098;

const options = {
  hostname: 'twserver.alunos.dcc.fc.up.pt',
  port: 9098,
  path:'/register',
  method: 'GET'
}


const server = http.createServer(function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', 'http://${originHost}:${originPort}');
    if(req.url === "/"){
        fs.readFile("./index.html", "UTF-8", function(err, html){
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(html);
        });
    }else if(req.url.match("\.css$")){
        var cssPath = path.join(__dirname, req.url);
        var fileStream = fs.createReadStream(cssPath, "UTF-8");
        res.writeHead(200, {"Content-Type": "text/css"});
        fileStream.pipe(res);

    }else if(req.url.match("\.png$")){
        var imagePath = path.join(__dirname, req.url);
        var fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, {"Content-Type": "image/png"});
        fileStream.pipe(res);
    }else if(req.url.match("\.jpg$")){
        var imagePath = path.join(__dirname, req.url);
        var fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, {"Content-Type": "image/jpg"});
        fileStream.pipe(res);
    }else if(req.url.match("\.js$")){
        var jsPath = path.join(__dirname, req.url);
        var fileStream = fs.createReadStream(jsPath);
        res.writeHead(200, {"Content-Type": "text/javascript"});
        fileStream.pipe(res);
    }else{
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end("No Page Found");
    }


}).listen(port);

console.log(`Server running at http://${hostname}:${port}/`);


const req_server = http.request(options, res =>{
  console.log(`statusCode: ${res.statusCode}`);
  res.on ('data', d => {
    process.stdout.write(d);
  });
});

req_server.on('error', error => {
  console.error(error)
});
